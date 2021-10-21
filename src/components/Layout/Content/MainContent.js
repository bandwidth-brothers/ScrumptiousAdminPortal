import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Box } from '@mui/material'
// import { Search, Refresh } from '@mui/icons-material'

import Forbidden from 'components/Routing/Forbidden'
import AdminHomepage from 'views/Dashboard/AdminDashboard'
import Restaurants from 'views/Restaurants/RestaurantList/RestaurantList';
import Settings from 'views/Settings/Settings'
import FullRestaurant from 'views/Restaurants/Restaurant/FullRestaurant'
import OrderDetail from 'views/Orders/Order/OrderDetails'
import OrderList from 'views/Orders/OrderList/OrderList'

export default class MainContent extends Component {
    render() {
        return (
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                < Switch >
                    <Route exact path="/admin/settings" component={Settings} />
                    <Route exact path="/admin/restaurants/:id" component={FullRestaurant} />
                    <Route exact path="/admin/orders" component={OrderList} />
                    <Route exact path="/admin/orders/:id" component={OrderDetail} />
                    <Route exact path="/admin/restaurants" component={Restaurants} />
                    <Route exact path="/admin/forbidden" component={Forbidden} />
                    <Route exact path="/admin" component={AdminHomepage} />
                    <Redirect path="/" to="/admin" />
                </ Switch>
            </Box>
        )
    }
}
