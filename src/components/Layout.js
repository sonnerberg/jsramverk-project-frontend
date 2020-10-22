import React from 'react'

import Header from './Header'
import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Navigation />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
