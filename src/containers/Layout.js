import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Main from './higher-order-components/Main/Main'
import NavBar from '../components/Navigation/NavBar/NavBar'
import SidebarAndMain from './higher-order-components/Main/SidebarAndMain'

export default class Layout extends Component {
    render() {
        return (
            <Main>
                <NavBar></NavBar>
                <Switch>
                    <Route exact path="/admin/restaurants" component={SidebarAndMain} />
                    <Route exact path="/admin/restaurants/:id/category-collection" component={SidebarAndMain} />
                    <Route exact path="/admin/restaurants/:id" component={SidebarAndMain} />
                </Switch>
            </Main>
        )
    }
}
