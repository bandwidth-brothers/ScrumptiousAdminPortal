import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

import { Link } from 'react-router-dom'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { Logout } from '@mui/icons-material'

import { useSelector } from 'react-redux';

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigation(props) {
    const { ...other } = props;
    const title = useSelector(state => state.title)



    const logoutHandler = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        localStorage.removeItem('expiresAt')
        console.log('LOGGEDOUT')
    }

    const categories = [
        {
            id: 'Build',
            children: [
                {
                    id: 'Home',
                    icon: <HomeIcon />,
                    link: "/admin"
                },
                {
                    id: 'Restaurants',
                    icon: <RestaurantIcon />,
                    link: "/admin/restaurants"
                },

                {
                    id: 'Orders',
                    icon: <RestaurantIcon />,
                    link: "/admin/orders"
                },


            ],
        },
        {
            id: 'Quality',
            children: [
                {
                    id: 'Settings',
                    icon: <SettingsIcon />,
                    link: 'admin/settings'

                },
                {
                    id: 'Logout',
                    icon: <Logout />,
                    link: "/admin/logout",
                    handler: logoutHandler
                },

            ],
        },
    ];

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    Admin Portal
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Scrumptious</ListItemText>
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, link, handler }) => (
                            <ListItem disablePadding key={childId}>
                                <ListItemButton selected={childId === title ? true : false} sx={item}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <Link to={link}
                                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                                        onClick={handler}><ListItemText>{childId}</ListItemText></Link>

                                </ListItemButton>
                            </ListItem>
                        ))}

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}