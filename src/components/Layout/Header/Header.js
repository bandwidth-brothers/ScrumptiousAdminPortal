import * as React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { AppBar, Grid, Toolbar, Typography } from '@mui/material'
//import { Help, Menu, Notifications } from '@mui/icons-material'


import RestaurantHeader from './RestaurantHeader';


//const lightColor = 'rgba(255, 255, 255, 0.7)';


function Header(props) {
    //const { onDrawerToggle } = props;
    const title = useSelector(state => state.title)

    return (
        <React.Fragment>
            <AppBar></AppBar>
            <AppBar color="primary" position="sticky" elevation={0}>
                {/* <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <Menu />
                            </IconButton>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Link
                                to="/"
                                variant="body2"
                                sx={{
                                    textDecoration: 'none',
                                    color: lightColor,
                                    '&:hover': {
                                        color: 'common.white',
                                    },
                                }}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Go to docs
                            </Link>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Alerts • No alerts">
                                <IconButton color="inherit">
                                    <Notifications />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }}>
                                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar> */}
            </AppBar>
            <AppBar
                component="div"
                color="primary"
                position="static"
                elevation={0}
                sx={{ zIndex: 0 }}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                {title}
                            </Typography>
                        </Grid>
                        {/* <Grid item>
                            <Button
                                sx={{ borderColor: lightColor }}
                                variant="outlined"
                                color="inherit"
                                size="small"
                            >
                                Home
                            </Button>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Help">
                                <IconButton color="inherit">
                                    <Help />
                                </IconButton>
                            </Tooltip>
                        </Grid> */}
                    </Grid>
                </Toolbar>
            </AppBar>
            < Switch >
                <Route path="/admin/restaurants" component={RestaurantHeader} />
            </ Switch>

        </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;