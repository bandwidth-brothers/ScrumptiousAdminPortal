import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, CssBaseline, Box, useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavigationSidebar from './Sidebar/NavigationSidebar';
import Header from './higher-order-components/Header/Header'

import MainContent from './higher-order-components/Main/MainContent'
// import NavBar from '../components/Navigation/NavBar/NavBar'
// import SidebarAndMain from './higher-order-components/Main/SidebarAndMain'
// import Login from './Auth/Login/Login'
// import Logout from './Auth/Logout/Logout'
// import Register from './Auth/Register/Register'


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/admin/login">
                Scrumptious
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

let theme = createTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#081627',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    boxShadow: 'none',
                    '&:active': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    marginLeft: theme.spacing(1),
                },
                indicator: {
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    backgroundColor: theme.palette.common.white,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    margin: '0 16px',
                    minWidth: 0,
                    padding: 0,
                    [theme.breakpoints.up('md')]: {
                        padding: 0,
                        minWidth: 0,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(1),
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 4,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgb(255,255,255,0.15)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#4fc3f7',
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                    fontWeight: theme.typography.fontWeightMedium,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    minWidth: 'auto',
                    marginRight: theme.spacing(2),
                    '& svg': {
                        fontSize: 20,
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 32,
                    height: 32,
                },
            },
        },
    },
};

const drawerWidth = 256;

const Layout = () => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    //const isLoggedIn = useSelector(state => state.logged)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {isSmUp ? null : (
                        <NavigationSidebar
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    )}

                    <NavigationSidebar
                        PaperProps={{ style: { width: drawerWidth } }}
                        sx={{ display: { sm: 'block', xs: 'none' } }}
                    />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header onDrawerToggle={handleDrawerToggle} />
                    <MainContent />

                    <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                        <Copyright />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>


        // <Main>
        //     <NavBar isLoggedIn={this.props.isLoggedIn}></NavBar>
        //     <Switch>
        //         <Route exact path="/admin/restaurants" component={SidebarAndMain} />
        //         <Route exact path="/admin/restaurants/:id/category-collection" component={SidebarAndMain} />
        //         <Route exact path="/admin/restaurants/:id" component={SidebarAndMain} />
        //         <Route exact path="/admin/forbidden" component={Forbidden} />
        //         <Route exact path="/admin" component={AdminHomepage} />
        //         <Route exact path="/admin/login" component={Login} />
        //         <Route exact path="/admin/register" component={Register} />
        //         <Route exact path="/admin/logout" component={Logout} />
        //         <Redirect path="/" to="/admin/login" />
        //     </Switch>
        // </Main>
    )
}



export default Layout