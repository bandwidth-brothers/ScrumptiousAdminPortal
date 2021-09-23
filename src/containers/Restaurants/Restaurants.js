import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Typography, Paper } from '@mui/material'

import RestaurantCard from '../../components/Restaurant/RestaurantCard'
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import CreateRestaurant from '../../components/CreateModal/CreateRestaurant/CreateRestaurant'
import { getAuthToken } from '../../Auth/authAxios'

import { useDispatch } from 'react-redux'
import { changeTitle } from '../../redux/actions/ActionsIndex'


export default function Restaurants() {
    const dispatch = useDispatch()
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        dispatch(changeTitle('Restaurants'))
        axios.get('http://localhost:8080/restaurant/admin/restaurants', { headers: { 'Authorization': getAuthToken() } })
            .then(res => {
                console.log(res.data)
                if (Array.isArray(res.data)) {
                    setRestaurants(res.data)
                }
            }).catch(e => {
                console.log(e)
            })
    }, [dispatch])


    const reloadRestaurant = () => {
        console.log("reloading")
        axios.get('http://localhost:8080/restaurant/admin/restaurants', { headers: { 'Authorization': getAuthToken() } })
            .then(res => {
                console.log(res.data)
                if (Array.isArray(res.data)) {
                    setRestaurants(res.data)
                }
            }).catch(e => {
                console.log(e)
            })
    }

    const restaurantList = restaurants.map(restaurant => {
        console.log("CARD")
        return <RestaurantCard
            key={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            rating={restaurant.rating} />
    })



    return (

        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>

            <ResultsHeader
                buttonText="Add restaurant"
                reload={reloadRestaurant}>
                <CreateRestaurant />
            </ResultsHeader>


            {restaurants.length !== 0 ? restaurantList :
                <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                    No restaurants available yet
                </Typography>}

        </Paper>

        //  <section>
        //     <ResultsHeader
        //         name="Restaurants"
        //         buttonText="+ Restaurant">
        //         <CreateRestaurant
        //             submitCreate={reloadRestaurant} />
        //     </ResultsHeader>
        //     <CardColumns>
        //         {restaurants ? restaurantList : null}
        //     </CardColumns>
        // </section> 

    )

}
