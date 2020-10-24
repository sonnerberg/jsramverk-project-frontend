import { gql } from '@apollo/client'

export const SIGNUP_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    jwt: signUp(username: $username, email: $email, password: $password)
  }
`

export const SIGNIN_USER = gql`
  mutation signIn($username: String, $email: String, $password: String!) {
    jwt: signIn(username: $username, email: $email, password: $password)
  }
`

export const DEPOSIT = gql`
  mutation addFunds($amount: Int!) {
    balance: addFunds(amount: $amount)
  }
`
