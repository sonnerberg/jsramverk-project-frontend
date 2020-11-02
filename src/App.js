import React, { useEffect, useState } from 'react'
import GlobalStyle from './components/GlobalStyle'
import './App.css'

import Pages from './pages'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { PERSON_ADDED, STOCKS_UPDATED } from './gql/subscription'
import { GET_USERS } from './gql/query'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'

const App = () => {
  const [data, setData] = useState([])
  const [lastData, setLastData] = useState([])
  const [fetchUsers] = useLazyQuery(GET_USERS)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      fetchUsers()
    }
    return () => {
      mounted = false
    }
  }, [fetchUsers])
  // TODO: Get history for database
  const client = useApolloClient()

  const maxArraySize = 365
  useSubscription(STOCKS_UPDATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      setLastData(
        subscriptionData.data.stocksUpdated.map((stock) => ({
          name: stock.name,
          price: stock.startingPoint,
        }))
      )
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
            values: [...data[index]['values'], stock.startingPoint].slice(
              -maxArraySize
            ),
          }))
        )
      }
    },
  })

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      // This function runs twice for some reason
      try {
        const usersBefore = client.readQuery({ query: GET_USERS })

        // Do not add same username twice
        const lastuserNameExisting =
          usersBefore.users[usersBefore.users.length - 1].username

        const usernameIncoming = subscriptionData.data.personAdded.username

        const usernameSame = lastuserNameExisting === usernameIncoming

        if (!usernameSame) {
          client.writeQuery({
            query: GET_USERS,
            data: {
              users: [...usersBefore.users, subscriptionData.data.personAdded],
            },
          })
        }
      } catch (err) {
        // This is the first user to be added
        client.writeQuery({
          query: GET_USERS,
          data: {
            users: [subscriptionData.data.personAdded],
          },
        })
      }
    },
  })

  // TODO: Make hamburger: https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Pages
        data={data}
        numberOfGraphPoints={maxArraySize}
        lastData={lastData}
      />
    </ThemeProvider>
  )
}

export default App
