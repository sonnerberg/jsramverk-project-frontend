import { gql } from '@apollo/client'

export const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`

export const STOCKS_AND_BALANCE = gql`
  query stocksAndBalance {
    balance
    myStocks {
      name
      amount
    }
  }
`
