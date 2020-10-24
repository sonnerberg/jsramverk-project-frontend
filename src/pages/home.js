import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const Home = ({ data }) => {
  return (
    <>
      <div>This is the home</div>
      {data.data &&
        data.data.stocksUpdated.map((hist) => (
          <React.Fragment key={uuidv4()}>
            <div>
              <p>{hist.name}</p>
              <p>{hist.startingPoint}</p>
            </div>
          </React.Fragment>
        ))}
    </>
  )
}

export default Home
