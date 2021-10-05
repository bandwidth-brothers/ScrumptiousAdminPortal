import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Box } from '@mui/material'
// import { Search, Refresh } from '@mui/icons-material'

import Forbidden from '../../Auth/Forbidden'
import AdminHomepage from '../../higher-order-components/Homepage/AdminHomepage'
import Restaurants from '../../Restaurants/Restaurants';

export default class MainContent extends Component {
    render() {
        return (
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                < Switch >
                    <Route exact path="/admin/restaurants" component={Restaurants} />

                    {/* <Route exact path="/admin/restaurants/:id/category-collection" component={SidebarAndMain} />
            <Route exact path="/admin/restaurants/:id" component={SidebarAndMain} /> */}
                    <Route exact path="/admin/forbidden" component={Forbidden} />
                    <Route exact path="/admin" component={AdminHomepage} />
                    <Redirect path="/" to="/admin/login" />
                </ Switch>
            </Box>
        )
    }
}
