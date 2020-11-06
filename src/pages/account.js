import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { STOCKS_AND_BALANCE } from '../gql/query'
import { v4 as uuidv4 } from 'uuid'
import Spinner from '../components/Spinner'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Account = () => {
  const [getStocksAndBalance, { data, loading, error }] = useLazyQuery(
    STOCKS_AND_BALANCE
  )

  // https://github.com/apollographql/apollo-client/issues/6209#issuecomment-676373050
  // https://github.com/apollographql/apollo-client/issues/6209
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getStocksAndBalance()
    }
    return () => {
      isMounted = false
    }
  }, [getStocksAndBalance])

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
    <Flex>
      <h2>Balance and stocks</h2>
      <div>
        Account balance: {data && <span>{data.balance.toFixed(2)}</span>}
      </div>
      {data && data.myStocks.length > 0 && <h3>Stocks:</h3>}
      {data &&
        data.myStocks.map((stock) => (
          <div key={uuidv4()}>
            <p>
              Name: <span>{stock.name}</span>
            </p>
            <p>
              Amount: <span>{stock.amount}</span>
            </p>
          </div>
        ))}
    </Flex>
  )
}

export default Account
