import { useApolloClient, useMutation } from '@apollo/client'
import React from 'react'
import { SIGNIN_USER } from './gql/mutation'

import UserForm from './components/UserForm'
import { IS_LOGGED_IN } from './gql/query'
import styled from 'styled-components'
import Spinner from './components/Spinner'

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

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
    onError: (error) => {
      console.error(error.message)
    },
  })

  return (
    <StyledLogin>
      <UserForm action={signIn} formType="login" />
      {loading && <Spinner />}
      {error && <p>Error signing in!</p>}
    </StyledLogin>
  )
}

export default Login
