import { useApolloClient, useMutation } from '@apollo/client'
import React from 'react'
import { SIGNUP_USER } from './gql/mutation'
import Spinner from './components/Spinner'

import UserForm from './components/UserForm'
import { IS_LOGGED_IN } from './gql/query'

const Register = ({ history }) => {
  const client = useApolloClient()

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('jsramverkProjectTradingToken', data.jwt)

      client.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: true },
      })

      history.push('/')
    },
    onError: (err) => {
      console.error(err.message)
    },
  })

  return (
    <>
      <UserForm action={signUp} formType="register" />
      {loading && <Spinner />}
      {error && <p>Error creating account!</p>}
    </>
  )
}

export default Register
