import React, { useContext, useEffect } from 'react'

import { Typography, Paper } from '@mui/material'

import RestaurantCard from '../../components/Restaurant/RestaurantCard'
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import CreateRestaurant from '../../components/CreateModal/CreateRestaurant/CreateRestaurant'

import { useDispatch } from 'react-redux'
import { changeTitle } from '../../redux/actions/ActionsIndex'
import { RestaurantsStateContext } from '../higher-order-components/Context/Context'
import { RestaurantService } from '../../services/RestaurantService'

export default function Restaurants() {
    const dispatch = useDispatch()
    const [restaurants, setRestaurants] = useContext(RestaurantsStateContext);

    useEffect(() => {
        dispatch(changeTitle('Restaurants'))
        console.log("INIT")
        if (restaurants.length === 0) {
            console.log("NULL")
            RestaurantService.getRestaurantList()
                .then(function (response) {
                    const re = response.data;
                    setRestaurants(re);
                    console.log(re)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [dispatch, restaurants.length, setRestaurants])


    const reloadRestaurant = () => {
        console.log("reloading")
        RestaurantService.getRestaurantList()
            .then(function (response) {
                const re = response.data;
                setRestaurants(re);
                console.log(re)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const restaurantList = restaurants.map(restaurant => {
        console.log("CARD")
        return <RestaurantCard
            key={restaurant.id}
            reload={reloadRestaurant}
            restaurant={restaurant}
            address={restaurant.address} />
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
