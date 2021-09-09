import React, { Component } from 'react'
import axios from 'axios'
import { CardColumns } from 'react-bootstrap'

import RestaurantCard from '../../components/Restaurant/RestaurantCard'
import ResultsHeader from '../ResultsHeader/ResultsHeader'
import CreateRestaurant from '../../components/CreateModal/CreateRestaurant/CreateRestaurant'



export default class Restaurants extends Component {

    constructor(props) {
        super(props)
        this.state = {
            restaurants: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:9041/admin/restaurants', { headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJVc2VySWQiOiJjMjI1YTE3OC1mNDdmLTRkNGQtOGUzNi1lNmMzZTk2MmRlOGUiLCJBdXRob3JpdGllcyI6IlJPTEVfQURNSU4iLCJleHAiOjE2MzE0NzIyNTB9.zRalXLueNHSxnvORSTfQo9-U_ol2pqoqcx9sVc_EfvNS_noZ5yVTEixWrHk8xiBVqF2SkIUrniifBg5Bzzc22g' } })
            .then(res => {
                console.log(res.data)
                this.setState({ restaurants: res.data })
            }).catch(e => {
                console.log(e)
            })
    }

    reloadRestaurant = () => {
        axios.get('http://localhost:9041/admin/restaurants', { headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJVc2VySWQiOiJjMjI1YTE3OC1mNDdmLTRkNGQtOGUzNi1lNmMzZTk2MmRlOGUiLCJBdXRob3JpdGllcyI6IlJPTEVfQURNSU4iLCJleHAiOjE2MzE0NzIyNTB9.zRalXLueNHSxnvORSTfQo9-U_ol2pqoqcx9sVc_EfvNS_noZ5yVTEixWrHk8xiBVqF2SkIUrniifBg5Bzzc22g' } })
            .then(res => {
                console.log(res.data)
                this.setState({ restaurants: res.data })
            }).catch(e => {
                console.log(e)
            })
    }

    restaurantList = () => {
        return this.state.restaurants.map(restaurant => {
            return <RestaurantCard
                key={restaurant.restaurantId}
                name={restaurant.name}
                address={restaurant.address}
                rating={restaurant.rating} />
        })
    }

    render() {
        return (

            <section>
                <ResultsHeader
                    name="Restaurants"
                    buttonText="+ Restaurant">
                    <CreateRestaurant
                        submitCreate={this.reloadRestaurant} />
                </ResultsHeader>
                <CardColumns>
                    {this.state.restaurants ? this.restaurantList() : null}
                </CardColumns>
            </section>

        )
    }
}
