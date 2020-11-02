import React from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { Graph } from '../components/Graph'

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 1115px) {
    flex-direction: column;
    align-items: center;
  }
`

const Home = ({ data }) => {
  return (
    <>
      <Flex>
        {data && data.map((stock) => <Graph stock={stock} key={uuidv4()} />)}
      </Flex>
    </>
  )
}

export default Home
