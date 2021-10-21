import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Typography, Paper } from '@mui/material'

import MenuItemCard from 'views/MenuItems/MenuItem/MenuItemCard'
import ResultsHeader from 'utils/ResultsHeader/ResultsHeader'
import CreateMenuItem from 'components/Modals/CreateModals/CreateMenuItem'
import { changeTitle } from 'redux/actions/ActionsIndex'
import { RestaurantService } from 'services/RestaurantService'
import { MenuService } from 'services/MenuService'

export default function MenuItemList(props) {
    const dispatch = useDispatch()
    const [menuItems, setMenuItems] = useState([]);

    const id = props.match.params.id;

    useEffect(() => {
        dispatch(changeTitle('Menu Items'))
        if (menuItems.length === 0) {
            console.log("NULL")
            MenuService.getMenuItemsFromRestaurantId(id)
                .then(function (response) {
                    setMenuItems(response.data);
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [dispatch, menuItems.length, setMenuItems])


    const reloadMenuItems = () => {
        console.log("reloading")
        MenuService.getMenuItemsFromRestaurantId(id)
            .then(function (response) {
                setMenuItems(response.data);
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const menuItemList = menuItems.map(menuItem => {
        console.log("CARD")
        return <MenuItemCard
            key={menuItem.id}
            reload={reloadMenuItems}
            menuItem={menuItem} />
    })



    return (

        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>

            <ResultsHeader
                buttonText="Add Menu Item"
                reload={reloadMenuItems}>
                <CreateMenuItem />
            </ResultsHeader>


            {menuItems.length !== 0 ? menuItemList :
                <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                    No Menu Items available yet
                </Typography>}

        </Paper>
    )

}
