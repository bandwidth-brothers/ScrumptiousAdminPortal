import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Layout from './containers/Layout'
import Login from './containers/Auth/Login/Login'
import Logout from './containers/Auth/Logout/Logout'
import Forbidden from './containers/Auth/Forbidden'
import Register from './containers/Auth/Register/Register'

import { useSelector } from 'react-redux'
import OrderDetail from './components/Orders/OrderDetails'

const Routing = () => {
    const isLoggedIn = useSelector(state => state.logged)

    return (
        <  >
            {isLoggedIn ?
                <Switch>
                    <Route exact path="/admin" component={Layout} />
                    <Route exact path="/admin/restaurants" component={Layout} />
                    <Route exact path="/admin/orders" component={Layout} />
                    <Route exact path="/admin/orders/:id" component={Layout} />
                    <Route exact path="/admin/logout" component={Logout} />
                    {/* <Route exact path="/admin/restaurants/:id/category-collection" component={SidebarAndMain} /> */}
                    <Redirect path="/" to="/admin" />
                </Switch> :
                < Switch >
                    <Route exact path="/admin/login" component={Login} />
                    <Route exact path="/admin/register" component={Register} />
                    <Route exact path="/admin/logout" component={Logout} />
                    <Route exact path="/admin/forbidden" component={Forbidden} />
                    <Redirect path="/" to="/admin/login" />
                </ Switch>}
        </ >
    )
}

export default Routing
