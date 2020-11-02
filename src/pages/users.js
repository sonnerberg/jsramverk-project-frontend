import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GET_USERS } from '../gql/query'
import Spinner from '../components/Spinner'
import styled from 'styled-components'

const Img = styled.img`
  border-radius: 50%;
`

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

const Div = styled.div`
  margin-left: 10px;
`

const Users = () => {
  const [fetchUsers, { data, loading, error }] = useLazyQuery(GET_USERS)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      fetchUsers()
    }
    return () => {
      mounted = false
    }
  }, [fetchUsers])

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
      <h2>Registered users</h2>
      {data && data.users.length === 0 && <p>no users registered</p>}
      {data &&
        data.users.map((user) => (
          <Wrapper key={uuidv4()}>
            <UserWrapper>
              <Img
                src={user.avatar}
                alt={`${user.username} avatar`}
                height="50px"
              />
              <Div>{user.username}</Div>
            </UserWrapper>
          </Wrapper>
        ))}
    </>
  )
}

export default Users
