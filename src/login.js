import { useApolloClient, useMutation } from '@apollo/client'
import React from 'react'
import { SIGNIN_USER } from './gql/mutation'

import UserForm from './components/UserForm'
import { IS_LOGGED_IN } from './gql/query'

const Login = ({ history }) => {
  const client = useApolloClient()

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('jsramverkProjectTradingToken', data.jwt)

      client.writeQuery({
        query: IS_LOGGED_IN,
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
