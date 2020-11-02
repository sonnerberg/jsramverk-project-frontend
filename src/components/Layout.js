import React, { useRef, useState } from 'react'
import Burger from '../components/Burger'
import Menu from '../components/BurgerMenu'
import { useOnClickOutside } from '../burgerHook'

import Header from './Header'
import Footer from './Footer'
import Navigation from './Navigation'
import styled from 'styled-components'

const Div = styled.div`
  @media (max-width: ${({ theme }) => theme.tablet}) {
    display: none;
  }
`

const Wrapper = styled.div`
  padding-bottom: 2.5rem;
`

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false)
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))
  return (
    <Wrapper>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
      <Header />
      <Div>
        <Navigation />
      </Div>
      <div className="wrapper">
        {/* <Navigation /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </Wrapper>
  )
}

export default Layout
