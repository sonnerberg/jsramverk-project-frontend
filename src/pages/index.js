import { useApolloClient } from '@apollo/client'
import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Layout from '../components/Layout'
import { IS_LOGGED_IN } from '../gql/query'
import Login from '../login'
import Register from '../register'
import Account from './account'
import Buy from './buy'
import Deposit from './deposit'
import Home from './home'
import Sell from './sell'
import Users from './users'

const Pages = (props) => {
  return (
    <>
      <Router>
        <Layout>
          <Route exact path="/">
            <Home data={props.data} />
          </Route>
          <Route path="/users" component={Users} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/buy" component={Buy} />
          <PrivateRoute path="/sell" component={Sell} />
          <PrivateRoute path="/account" component={Account} />
          <PrivateRoute path="/deposit" component={Deposit} />
        </Layout>
      </Router>
    </>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const client = useApolloClient()

  const { isLoggedIn } = client.readQuery({
    query: IS_LOGGED_IN,
  })

  // if (loading) return <p>Loading...</p>

  // if (error) return <p>Error!</p>

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/register', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default Pages
