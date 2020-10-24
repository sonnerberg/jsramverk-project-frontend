import React, { useState } from 'react'

const UserForm = ({ formType, action }) => {
  const [values, setValues] = useState()

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    action({
      variables: {
        ...values,
      },
    })
  }

  return (
    <>
      {formType === 'register' ? <h2>Sign up</h2> : <h2>Sign in</h2>}
      <form onSubmit={onSubmit}>
        {formType === 'register' && (
          <>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              required="required"
              name="username"
              placeholder="username"
              onChange={onChange}
            />
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          required="required"
          name="email"
          placeholder="email"
          onChange={onChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          required="required"
          name="password"
          placeholder="password"
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default UserForm
