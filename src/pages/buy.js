import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import React, { useEffect, useState } from 'react'
import { BUY_STOCK } from '../gql/mutation'
import { AVAILABLE_STOCKS, STOCKS_AND_BALANCE } from '../gql/query'
import Spinner from '../components/Spinner'
import styled from 'styled-components'
import Button from '../components/Button'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Buy = (props) => {
  const client = useApolloClient()

  const [availableStocks, setAvailableStocks] = useState([])

  const [amount, setAmount] = useState('')
  const [stock, setStock] = useState('')

  const [getStocks, { data: stockNames }] = useLazyQuery(AVAILABLE_STOCKS, {
    fetchPolicy: 'cache-only',
  })

  const [
    buyStock,
    { loading: loadingPurchase, error: errorPurchase },
  ] = useMutation(BUY_STOCK, {
    onCompleted: (data) => {
      const stocksBefore = client.readQuery({
        query: STOCKS_AND_BALANCE,
      })

      const stocksWithoutNewData = stocksBefore.myStocks.filter(
        (stock) => stock.name !== data.myStocks.name
      )

      const updatedStocks = [
        ...stocksWithoutNewData,
        { name: data.myStocks.name, amount: data.myStocks.amount },
      ]

      client.writeQuery({
        query: STOCKS_AND_BALANCE,
        data: {
          balance: data.myStocks.balance,
          myStocks: updatedStocks,
        },
      })

      props.history.push('/account')
    },
    onError: (err) => {
      // TODO: Send to notify component
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
    onError: (error) => {
      console.error(error.message)
    },
  })

  // Get stocks and balance in order to have it in the cache for
  // when the purchase completes
  const [getStocksAndBalance, { data: stocksAndBalance }] = useLazyQuery(
    STOCKS_AND_BALANCE
  )

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getStocksAndBalance()
      stocksAvailable()
      getStocks()
      setAvailableStocks(
        stockNames ? stockNames.stocks.map((stock) => stock.name) : []
      )
    }
    return () => {
      isMounted = false
    }
  }, [getStocks, stockNames, getStocksAndBalance, stocksAvailable])

  useEffect(() => {
    document.title = 'Buy stocks'
  }, [])

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

  let totalPrice
  let priceNow

  if (props.lastData) {
    priceNow = props.lastData.filter((item) => item.name === stock)
    if (Array.isArray(priceNow) && priceNow.length > 0) {
      priceNow = priceNow[0].price
      totalPrice = priceNow * amount
    }
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
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
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          required="required"
          onChange={onChangeAmount}
          placeholder="amount"
          value={amount}
          min="1"
          step="1"
        />
        <Button
          type="submit"
          disabled={
            stocksAndBalance ? totalPrice > stocksAndBalance.balance : false
          }
        >
          Buy stock
        </Button>
      </Form>
      {props.lastData
        .filter((data) => data.name === stock)
        .map((stock) => {
          totalPrice = (stock.price * 1000000 * amount) / 1000000
          return (
            <Flex key={uuidv4()}>
              <div>
                Price: {stock.price} per {stock.name}.
              </div>
              <div>Total price: {totalPrice}</div>
            </Flex>
          )
        })}
      {loadingPurchase && <Spinner />}
      {loadingStocks && <Spinner />}
      {errorPurchase && <div>{errorPurchase.message}</div>}
      {errorStocks && <div>{errorStocks.message}</div>}
    </>
  )
}

export default Buy
