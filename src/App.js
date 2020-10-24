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
      setData(subscriptionData)
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
