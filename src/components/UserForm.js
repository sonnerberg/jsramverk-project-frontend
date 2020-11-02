import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

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
      <Form onSubmit={onSubmit}>
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
        <Button type="submit">Submit</Button>
      </Form>
    </>
  )
}

export default UserForm
