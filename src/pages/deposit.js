import { useApolloClient, useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { DEPOSIT } from '../gql/mutation'
import { CHECK_BALANCE } from '../gql/query'
import Spinner from '../components/Spinner'
import styled from 'styled-components'
import Button from '../components/Button'
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Deposit = (props) => {
  const client = useApolloClient()

  useEffect(() => {
    document.title = 'Deposit'
  }, [])

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
      <Form onSubmit={onSubmit}>
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
        <Button type="submit">Deposit</Button>
      </Form>
      {loading && <Spinner />}
      {error && <p>Error depositing!</p>}
    </>
  )
}

export default Deposit
