import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IS_LOGGED_IN } from '../gql/query'
import Spinner from './Spinner'

const Li = styled.li`
  list-style-type: none;
  margin-left: -40px;
  @media (min-width: ${({ theme }) => theme.tablet}) {
    width: 130px;
    a {
      padding: 2rem 0;
    }
  }
`

const Ul = styled.ul`
  @media (min-width: ${({ theme }) => theme.tablet}) {
    display: flex;
  }
  padding-bottom: 1.5rem;
`

const Navigation = ({ setOpen }) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'cache-only',
  })

  const closeMenu = () => {
    if (setOpen) setOpen(false)
  }

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
      <nav>
        <Ul
          style={{
            justifyContent:
              data && data.isLoggedIn ? 'space-evenly' : 'flex-start',
            marginLeft: data && data.isLoggedIn ? '' : '2rem',
          }}
        >
          <Li>
            <Link to="/" onClick={closeMenu} className="homeLink">
              <span aria-hidden="true" role="img">
                📈
              </span>
              Home
            </Link>
          </Li>
          <Li>
            <Link to="/users" onClick={closeMenu} className="usersLink">
              <span aria-hidden="true" role="img">
                👥
              </span>
              Users
            </Link>
          </Li>
          {data && data.isLoggedIn && (
            <>
              <Li>
                <Link to="/buy" onClick={closeMenu} className="buyLink">
                  <span aria-hidden="true" role="img">
                    💸
                  </span>
                  Buy stocks
                </Link>
              </Li>
              <Li>
                <Link to="/sell" onClick={closeMenu} className="sellLink">
                  <span aria-hidden="true" role="img">
                    💵
                  </span>
                  Sell stocks
                </Link>
              </Li>
              <Li>
                <Link to="/account" onClick={closeMenu} className="accountLink">
                  <span aria-hidden="true" role="img">
                    🏦
                  </span>
                  Account
                </Link>
              </Li>
              <Li>
                <Link to="/deposit" onClick={closeMenu} className="depositLink">
                  <span aria-hidden="true" role="img">
                    💳
                  </span>
                  Deposit
                </Link>
              </Li>
            </>
          )}
        </Ul>
      </nav>
    </>
  )
}

export default Navigation
