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
export const CHECK_BALANCE = gql`
  query checkBalance {
    balance
  }
`
export const MY_STOCKS = gql`
  query stocks {
    myStocks {
      name
      amount
    }
  }
`

export const NAMES_MY_STOCKS = gql`
  query stocks {
    myStocks {
      name
    }
  }
`

export const AVAILABLE_STOCKS = gql`
  query availableStocks {
    stocks {
      name
    }
  }
`

export const GET_USERS = gql`
  query get_users {
    users {
      username
      avatar
    }
  }
`
