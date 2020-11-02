import React from 'react'
import styled from 'styled-components'
import { MarkGithub } from 'styled-icons/octicons'

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3vh;
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <FooterContent>
          <a href="https://www.github.com/sonnerberg">
            <MarkGithub size={16} />
          </a>
          <p>&copy; Richard Sönnerberg</p>
        </FooterContent>
      </StyledFooter>
    </>
  )
}

export default Footer
