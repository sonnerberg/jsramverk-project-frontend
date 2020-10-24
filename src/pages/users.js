import { gql, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const GET_USERS = gql`
  query get_users {
    users {
      username
      email
      avatar
    }
  }
`

const Users = () => {
  const { data, loading, error, refetch } = useQuery(GET_USERS)

  useEffect(() => {
    refetch()
  }, [refetch])

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
      <div>This is where you can see statistics of registered users</div>
      {data.users.length === 0 && <p>no users registered</p>}
      {data.users.map((user) => (
        <React.Fragment key={uuidv4()}>
          <div>
            <img
              src={user.avatar}
              alt={`${user.username} avatar`}
              height="50px"
            />
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </React.Fragment>
      ))}
    </>
  )
}

export default Users
