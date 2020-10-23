import { gql } from '@apollo/client'

const GET_USERS = gql`
  query get_users {
    users {
      id
      username
      email
      avatar
    }
  }
`

export { GET_USERS }
