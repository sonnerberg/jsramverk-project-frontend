import { gql, useApolloClient, useMutation } from '@apollo/client'
import React from 'react'
import { SIGNUP_USER } from './gql/mutation'

import UserForm from './components/UserForm'

const Register = ({ history }) => {
  const client = useApolloClient()

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
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
      <UserForm action={signUp} formType="register" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating account!</p>}
    </>
  )
}

export default Register
