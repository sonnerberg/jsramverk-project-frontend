import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from './home'
import Users from './users'

const Pages = () => {
  return (
    <>
      <Router>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
        </Layout>
      </Router>
    </>
  )
}

export default Pages
