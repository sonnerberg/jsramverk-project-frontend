import React from 'react'
import GlobalStyle from './components/GlobalStyle'
import './App.css'

import Pages from './pages'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const uri = process.env.REACT_APP_API_URI
const cache = new InMemoryCache()

const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true,
})

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Pages />
  </ApolloProvider>
)

export default App
