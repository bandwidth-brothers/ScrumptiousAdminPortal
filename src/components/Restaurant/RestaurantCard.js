import React from 'react'

import userProfile from '../../assets/images/logo-template.jpg'
import styled from 'styled-components'

import { Typography, Card, CardContent, CardMedia, CardActionArea } from '@mui/material'


const StyledCardMedia = styled(CardMedia)`
  width:120px;
  height: 120px;
`
const StyledCard = styled(Card)`
    margin: 7px;
`
const StyledCardActionArea = styled(CardActionArea)`
    display: flex;
    justify-content: flex-start;
`
export default function RestaurantCard(props) {



    return (
        <StyledCard>
            <StyledCardActionArea>
                <StyledCardMedia
                    component="img"
                    image={userProfile}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.address.city}, {props.address.state}
                    </Typography>
                </CardContent>
            </StyledCardActionArea>
            {/* <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
            </CardActions> */}
        </StyledCard>
        // <div>
        //     <StyledCard className="card flex-row">
        //         <StyledImg
        //             className="card-img"
        //             src={userProfile} />
        //         <StyledCardBody className="card-body">
        //             <div className="card-title h2">{this.props.name}</div>
        //             <Card.Text>{this.props.address.city}, {this.props.address.state}</Card.Text>
        //         </StyledCardBody>
        //     </StyledCard>
        // </div>
    )
}
