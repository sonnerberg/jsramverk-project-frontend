import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { IS_LOGGED_IN } from '../gql/query'

const Navigation = () => {
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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          {data && data.isLoggedIn && (
            <>
              <li>
                <Link to="/buy">Buy stocks</Link>
              </li>
              <li>
                <Link to="/sell">Sell stocks</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/deposit">Deposit</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navigation
