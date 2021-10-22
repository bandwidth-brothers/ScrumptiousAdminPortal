import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import Login from 'views/Login/Login'
import Logout from 'views/Logout/Logout'
import Forbidden from './Forbidden'
import Register from 'views/Register/Register'
import Layout from 'components/Layout/Layout'
import ProtectedRoute from './ProtectedRoute'

const Routing = () => {
    return (
        <  >
            <Switch>
                <ProtectedRoute exact path="/admin" component={Layout} />
                <ProtectedRoute exact path="/admin/orders" component={Layout} />
                <ProtectedRoute exact path="/admin/orders/:id" component={Layout} />
                <ProtectedRoute exact path="/admin/restaurants/:id" component={Layout} />
                <ProtectedRoute exact path="/admin/restaurants" component={Layout} />
                <ProtectedRoute exact path="/admin/orders" component={Layout} />
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
