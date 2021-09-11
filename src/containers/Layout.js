import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Main from './higher-order-components/Main/Main'
import NavBar from '../components/Navigation/NavBar/NavBar'
import SidebarAndMain from './higher-order-components/Main/SidebarAndMain'
import Login from './Auth/Login/Login'
import Logout from './Auth/Logout/Logout'
import Register from './Auth/Register/Register'
import Forbidden from './Auth/Forbidden'
import AdminHomepage from './higher-order-components/Homepage/AdminHomepage'

export default class Layout extends Component {



    render() {
        return (
            <Main>
                <NavBar isLoggedIn={this.props.isLoggedIn}></NavBar>
                <Switch>
                    <Route exact path="/admin/restaurants" component={SidebarAndMain} />
                    <Route exact path="/admin/restaurants/:id/category-collection" component={SidebarAndMain} />
                    <Route exact path="/admin/restaurants/:id" component={SidebarAndMain} />
                    <Route exact path="/admin/forbidden" component={Forbidden} />
                    <Route exact path="/admin" component={AdminHomepage} />
                    <Route exact path="/admin/login" component={Login} />
                    <Route exact path="/admin/register" component={Register} />
                    <Route exact path="/admin/logout" component={Logout} />
                    <Redirect path="/" to="/admin/login" />
                </Switch>
            </Main>
        )
    }
}
