import React, { } from 'react'
import { useHistory } from 'react-router-dom'

import userProfile from '../../assets/images/logo-template.jpg'
import styled from 'styled-components'

import { Typography, Card, CardContent, CardMedia, CardActionArea, Button } from '@mui/material'
import { RestaurantService } from '../../services/RestaurantService'


const StyledCardMedia = styled(CardMedia)`
  width:120px;
  height: 120px;
`
const StyledCard = styled(Card)`
    margin: 7px;
    display: flex;
`
const StyledCardActionArea = styled(CardActionArea)`
    display: flex;
    justify-content: flex-start;
`
const StyledButtton = styled(Button)`
  background-color:  #960018;
  max-width: 10px;

  &:hover {
      background-color: #476930
  }
`

export default function RestaurantCard(props) {
    const history = useHistory()

    const restaurantHandle = (id) => {
        history.push("/admin/restaurants/" + id)
    }

    const handleActivation = (restaurant) => {
        console.log(restaurant)
        RestaurantService.getOwnerByRestaurantId(restaurant.id).then(res => {
            const formData = {
                name: restaurant.name,
                cuisines: [],
                phone: restaurant.phone,
                priceCategory: restaurant.priceCategory,
                isActive: true,
                logo: restaurant.logo,
                raing: restaurant.rating,
                lineOne: restaurant.address.lineOne,
                lineTwo: restaurant.address.lineTwo,
                city: restaurant.address.city,
                state: restaurant.address.state,
                zip: restaurant.address.zip,
            }
            RestaurantService.updateRestaurant(res.data.id, restaurant.id, formData).then(res => {
                props.reload()
            });
        })
    }

    return (
        <StyledCard>
            <StyledCardActionArea onClick={() => restaurantHandle(props.restaurant.id)}>
                <StyledCardMedia
                    component="img"
                    image={userProfile}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.restaurant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.address.city}, {props.address.state}
                    </Typography>

                </CardContent>

            </StyledCardActionArea>
            {!props.restaurant.isActive ? <StyledButtton size="small" color="primary" onClick={() => handleActivation(props.restaurant)} /> : null}
        </StyledCard>
    )
}
