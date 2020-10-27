import { gql } from '@apollo/client'

export const STOCKS_UPDATED = gql`
  subscription {
    stocksUpdated {
      name
      startingPoint
    }
  }
`

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      username
      avatar
    }
  }
`
