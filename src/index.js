import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from 'apollo-link-context'
import { IS_LOGGED_IN } from './gql/query'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jsramverkProjectTradingToken')
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? token : null,
      },
    }
  }

  return { headers }
})

const uri =
  process.env.NODE_ENV === 'production'
    ? 'https://trading-api.sonnerberg.me/api'
    : 'http://localhost:4000/api'

const httpLink = new HttpLink({
  uri,
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        myStocks: {
          merge: false,
        },
      },
    },
  },
})

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'ws://trading-api.sonnerberg.me/subscription'
      : 'ws://localhost:4000/subscription',
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: splitLink,
  cache,
  resolvers: {},
  connectToDevTools: true,
})

const data = {
  isLoggedIn: Boolean(localStorage.getItem('jsramverkProjectTradingToken')),
}

cache.writeQuery({
  query: IS_LOGGED_IN,
  data,
})

client.onResetStore(() =>
  cache.writeQuery({
    query: IS_LOGGED_IN,
    data: { isLoggedIn: false },
  })
)

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
