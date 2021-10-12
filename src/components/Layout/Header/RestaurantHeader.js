import React from 'react'

import { AppBar, Tabs, Tab } from '@mui/material'

const RestaurantHeader = () => {
    return (
        <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
            <Tabs value={0} textColor="inherit">
                <Tab label="Restaurants" />
                <Tab label="Cuisines" />
            </Tabs>
        </AppBar>
    )
}

export default RestaurantHeader
