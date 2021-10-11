import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import Login from './containers/Auth/Login/Login'
import Logout from './containers/Auth/Logout/Logout'
import Forbidden from './containers/Auth/Forbidden'
import Register from './containers/Auth/Register/Register'

import Layout from './containers/Layout'
import ProtectedRoute from './containers/Auth/AuthGuard/ProtectedRoute'

const Routing = () => {
    return (
        <  >
            <Switch>
                <ProtectedRoute exact path="/admin" component={Layout} />
                <ProtectedRoute exact path="/admin/restaurants/:id" component={Layout} />
                <ProtectedRoute exact path="/admin/restaurants" component={Layout} />
                <ProtectedRoute exact path="/admin/settings" component={Layout} />
                <ProtectedRoute exact path="/admin/register" component={Register} disabledOnLoggedIn />
                <ProtectedRoute exact path="/admin/login" component={Login} disabledOnLoggedIn />
                <ProtectedRoute exact path="/admin/logout" component={Logout} disabledOnLoggedIn />
                <ProtectedRoute exact path="/admin/forbidden" component={Forbidden} disabledOnLoggedIn />
                <Redirect path="/" to="/admin/login" />
            </ Switch>

        </ >
    )
}

export default Routing
