import React, { useState } from 'react'
import GlobalStyle from './components/GlobalStyle'
import './App.css'

import Pages from './pages'
import { gql, useSubscription } from '@apollo/client'

export const STOCKS_UPDATED = gql`
  subscription {
    stocksUpdated {
      id
      name
      rate
      startingPoint
      variance
    }
  }
`

const App = () => {
  const [data, setData] = useState([])
  useSubscription(STOCKS_UPDATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      // setData(subscriptionData)
      if (Array.isArray(data) && data.length === 0) {
        setData(
          subscriptionData.data.stocksUpdated.map((stock) => ({
            name: stock.name,
            values: [stock.startingPoint],
          }))
        )
      } else {
        setData(
          subscriptionData.data.stocksUpdated.map((stock, index) => ({
            name: stock.name,
            values: [...data[index]['values'], stock.startingPoint],
          }))
        )
      }
    },
  })

  return (
    <>
      <GlobalStyle />
      <Pages data={data} />
    </>
  )
}

export default App
