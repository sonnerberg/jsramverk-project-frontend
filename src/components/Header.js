import { useApolloClient, useQuery } from '@apollo/client'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { IS_LOGGED_IN } from '../gql/query'

const Header = ({ history }) => {
  const client = useApolloClient()
  const { data, loading, error } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'cache-only',
  })

  if (loading)
    return (
      <>
        <p>Loading...</p>
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
      <header>
        <h1>Buy/sell stocks</h1>
        {data && data.isLoggedIn ? (
          <>
            <button
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
            </button>
            {/* <ul>
              <li>
                <Link to="/buy">Buy stocks</Link>
              </li>
              <li>
                <Link to="/sell">Sell stocks</Link>
              </li>
              <li>
                <Link to="/account">My account</Link>
              </li>
            </ul> */}
          </>
        ) : (
          <p>
            <Link to={'/login'}>Sign In</Link> or{' '}
            <Link to={'/register'}>Sign Up</Link>
          </p>
        )}
      </header>
    </>
  )
}

export default withRouter(Header)
