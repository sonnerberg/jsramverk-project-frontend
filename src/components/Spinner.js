import React from 'react'
import styled from 'styled-components'

const Loader = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  animation: spin 1.5s normal infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Spinner = () => {
  return (
    <>
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    </>
  )
}

export default Spinner
