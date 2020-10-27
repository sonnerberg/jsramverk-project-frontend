import { useApolloClient, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { DEPOSIT } from '../gql/mutation'
import { CHECK_BALANCE } from '../gql/query'

const Deposit = (props) => {
  const client = useApolloClient()

  const [amount, setAmount] = useState('')
  const [deposit, { loading, error }] = useMutation(DEPOSIT, {
    onCompleted: (data) => {
      client.writeQuery({
        query: CHECK_BALANCE,
        data,
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const onChange = (event) => {
    setAmount(Number(event.target.value))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    deposit({
      variables: {
        amount,
      },
    })
    setAmount('')
    props.history.push('/account')
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          required="required"
          onChange={onChange}
          placeholder="amount"
          value={amount}
          min="1"
        />
        <button type="submit">Deposit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error depositing!</p>}
    </>
  )
}

export default Deposit
