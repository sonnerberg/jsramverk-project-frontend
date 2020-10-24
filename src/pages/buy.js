import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import React, { useEffect, useState } from 'react'
import { BUY_STOCK } from '../gql/mutation'
import { AVAILABLE_STOCKS, MY_STOCKS, STOCKS_AND_BALANCE } from '../gql/query'

const Buy = ({ history }) => {
  const client = useApolloClient()

  const [availableStocks, setAvailableStocks] = useState([])

  const [amount, setAmount] = useState('')
  const [stock, setStock] = useState('')

  const { data: stockNames } = useQuery(AVAILABLE_STOCKS, {
    fetchPolicy: 'cache-only',
  })

  const [
    buyStock,
    { loading: loadingPurchase, error: errorPurchase },
  ] = useMutation(BUY_STOCK, {
    onCompleted: (data) => {
      const stocksBefore = client.readQuery({
        query: MY_STOCKS,
      })

      const stocksWithoutNewData = stocksBefore.myStocks.filter(
        (stock) => stock.name !== data.myStocks.name
      )

      const updatedStocks = [...stocksWithoutNewData, data.myStocks]

      client.writeQuery({
        query: MY_STOCKS,
        data: {
          myStocks: updatedStocks,
        },
      })

      history.push('/account')
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  const [
    stocksAvailable,
    { loading: loadingStocks, error: errorStocks },
  ] = useLazyQuery(AVAILABLE_STOCKS, {
    onCompleted: (data) => {
      const stockNames = data.stocks.map((stock) => stock.name)
      setAvailableStocks(stockNames)
      client.writeQuery({
        query: AVAILABLE_STOCKS,
        data: stockNames,
      })
    },
  })

  // Get stocks and balance in order to have it in the cache for
  // when the purchase completes
  const [getStocksAndBalance] = useLazyQuery(STOCKS_AND_BALANCE)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getStocksAndBalance()
    }
    return () => {
      isMounted = false
    }
  }, [getStocksAndBalance])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      stocksAvailable()
    }
    return () => {
      isMounted = false
    }
  }, [stocksAvailable])

  useEffect(() => {
    setAvailableStocks(
      stockNames ? stockNames.stocks.map((stock) => stock.name) : []
    )
  }, [stockNames])

  const onChangeAmount = (event) => {
    setAmount(Number(event.target.value))
  }

  const onChangeStock = (event) => {
    setStock(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (stock && amount) {
      buyStock({
        variables: {
          stock,
          amount,
        },
      })
    }
  }

  // if (loadingPurchase || loadingStocks) return <p>loading</p>

  // if (errorPurchase || errorStocks) return <p>Error!</p>

  return (
    <>
      {loadingPurchase && <div>Loading...</div>}
      {loadingStocks && <div>Loading...</div>}
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
            --- Select stock to buy ---
          </option>
          {availableStocks.map((stock) => (
            <option key={uuidv4()} value={stock}>
              {stock}
            </option>
          ))}
        </select>
        <button type="submit">Buy stock</button>
      </form>
      {errorPurchase && <div>{errorPurchase.message}</div>}
      {errorStocks && <div>{errorStocks.message}</div>}
    </>
  )
}

export default Buy
