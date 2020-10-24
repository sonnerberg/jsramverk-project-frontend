import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { DEPOSIT } from '../gql/mutation'

const Deposit = () => {
  const [values, setValues] = useState()
  const [deposit, { loading, error }] = useMutation(DEPOSIT, {
    onCompleted: (data) => {
      console.log(data)
    },
  })

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: Number(event.target.value),
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    deposit({
      variables: {
        ...values,
      },
    })
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          name="amount"
          required="required"
          onChange={onChange}
          placeholder="amount"
        />
        <button type="submit">Deposit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error depositing!</p>}
    </>
  )
}

export default Deposit
