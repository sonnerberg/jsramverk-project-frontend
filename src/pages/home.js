import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const Home = ({ data }) => {
  // TODO: render a graph for each item in props.data
  return (
    <>
      <div>This is the home</div>
      {data &&
        data.map((stock) => {
          const name = stock.name
          const lastValue = stock.values[stock.values.length - 1]
          return (
            <div key={uuidv4()}>
              {name}: {lastValue}
            </div>
          )
        })}
    </>
  )
}

export default Home
