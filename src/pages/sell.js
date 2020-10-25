import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import React, { useEffect, useState } from 'react'
import { SELL_STOCK } from '../gql/mutation'
import { MY_STOCKS, STOCKS_AND_BALANCE } from '../gql/query'

const Sell = ({ history }) => {
  const client = useApolloClient()

  const [availableStocks, setAvailableStocks] = useState([])

  const [amount, setAmount] = useState('')
  const [stock, setStock] = useState('')

  const { data: stockNames } = useQuery(MY_STOCKS, {
    fetchPolicy: 'cache-only',
  })

  const [sellStock, { loading: loadingSale, error: errorSale }] = useMutation(
    SELL_STOCK,
    {
      onCompleted: (data) => {
        const stocksBefore = client.readQuery({
          query: MY_STOCKS,
        })

        const stocksWithoutNewData = stocksBefore.myStocks.filter(
          (stock) => stock.name !== data.myStocks.name
        )

        const updatedStocks = [...stocksWithoutNewData, data.myStocks]

        const updatedStocksFiltered = updatedStocks.filter(
          (stock) => stock.amount !== 0
        )

        client.writeQuery({
          query: MY_STOCKS,
          data: {
            myStocks: updatedStocksFiltered,
          },
        })

        history.push('/account')
      },
      onError: (err) => {
        // TODO: Send to notify component
        console.error(err.message)
      },
    }
  )

  const [
    stocksAvailable,
    { loading: loadingStocks, error: errorStocks },
  ] = useLazyQuery(MY_STOCKS, {
    onCompleted: (data) => {
      const stockNames = data.myStocks.map((stock) => stock.name)
      setAvailableStocks(stockNames)
      client.writeQuery({
        query: MY_STOCKS,
        data: stockNames,
      })
    },
  })

  // Get stocks and balance in order to have it in the cache for
  // when the sale completes
  const [getStocksAndBalance] = useLazyQuery(STOCKS_AND_BALANCE)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getStocksAndBalance()
      stocksAvailable()
      setAvailableStocks(
        stockNames ? stockNames.myStocks.map((stock) => stock.name) : []
      )
    }
    return () => {
      isMounted = false
    }
  }, [stockNames, stocksAvailable, getStocksAndBalance])

  const onChangeAmount = (event) => {
    setAmount(Number(event.target.value))
  }

  const onChangeStock = (event) => {
    setStock(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (stock && amount) {
      sellStock({
        variables: {
          stock,
          amount,
        },
      })
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          required="required"
          onChange={onChangeAmount}
          placeholder="amount"
          value={amount}
          min="1"
          step="0.01"
        />
        <label htmlFor="stock">Stock:</label>
        <select
          value={stock}
          required
          name="stock"
          id="stock"
          onChange={onChangeStock}
          onBlur={onChangeStock}
        >
          <option value="" disabled>
            --- Select stock to sell ---
          </option>
          {availableStocks.map((stock) => (
            <option key={uuidv4()} value={stock}>
              {stock}
            </option>
          ))}
        </select>
        <button type="submit">Sell stock</button>
      </form>
      {loadingSale && <div>Loading...</div>}
      {loadingStocks && <div>Loading...</div>}
      {errorSale && <div>{errorSale.message}</div>}
      {errorStocks && <div>{errorStocks.message}</div>}
    </>
  )
}

export default Sell
