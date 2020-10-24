import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { STOCKS_AND_BALANCE } from '../gql/query'
import { v4 as uuidv4 } from 'uuid'

const Account = () => {
  // const { data, loading, error } = useQuery(STOCKS_AND_BALANCE)
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
      <div>This is where you can see your balance and stocks</div>
      <div>Account balance: {data && data.balance}</div>
      {data && data.myStocks.length > 0 && <div>Stocks:</div>}
      {data &&
        data.myStocks.map((stock) => (
          <div key={uuidv4()}>
            <p>Name: {stock.name}</p>
            <p>Amount: {stock.amount}</p>
          </div>
        ))}
    </>
  )
}

export default Account
