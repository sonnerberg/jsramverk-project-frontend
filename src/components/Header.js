import { useApolloClient, useQuery } from '@apollo/client'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { IS_LOGGED_IN } from '../gql/query'
import Spinner from './Spinner'

const StyledHeader = styled.header`
  @media (max-width: ${({ theme }) => theme.tablet}) {
    padding-right: 5rem;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;

  a {
    padding: 1rem 0;
  }
`

const Button = styled.button`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
`

const Header = ({ history }) => {
  const client = useApolloClient()
  const { data, loading, error } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'cache-only',
  })

  if (loading)
    return (
      <>
        <Spinner />
      </>
    )

  if (error)
    return (
      <>
        <p>Error!</p>
      </>
    )

  return (
    <>
      <StyledHeader>
        <h1>Buy/sell stocks</h1>
        {data && data.isLoggedIn ? (
          <>
            <Button
              onClick={() => {
                localStorage.removeItem('jsramverkProjectTradingToken')

                client.resetStore()

                client.writeQuery({
                  query: IS_LOGGED_IN,
                  data: { isLoggedIn: false },
                })

                history.push('/')
              }}
            >
              logout
            </Button>
          </>
        ) : (
          <p>
            <Link to={'/login'}>Sign In</Link> or{' '}
            <Link to={'/register'}>Sign Up</Link>
          </p>
        )}
      </StyledHeader>
    </>
  )
}

export default withRouter(Header)
