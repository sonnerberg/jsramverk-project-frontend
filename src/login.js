import { gql, useApolloClient, useMutation } from '@apollo/client'
import React from 'react'
import { SIGNIN_USER } from './gql/mutation'

import UserForm from './components/UserForm'

const Login = ({ history }) => {
  const client = useApolloClient()

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('jsramverkProjectTradingToken', data.jwt)

      client.writeQuery({
        query: gql`
          query LoggedIn {
            isLoggedIn
          }
        `,
        data: { isLoggedIn: true },
      })

      history.push('/')
    },
  })

  return (
    <>
      <UserForm action={signIn} formType="login" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating account!</p>}
    </>
  )
}

export default Login
