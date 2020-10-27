import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GET_USERS } from '../gql/query'

const Users = () => {
  // TODO: Use useLazyQuery instead
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
      {data && data.users.length === 0 && <p>no users registered</p>}
      {data &&
        data.users.map((user) => (
          <React.Fragment key={uuidv4()}>
            <div>
              <img
                src={user.avatar}
                alt={`${user.username} avatar`}
                height="50px"
              />
              <p>Username: {user.username}</p>
            </div>
          </React.Fragment>
        ))}
    </>
  )
}

export default Users
