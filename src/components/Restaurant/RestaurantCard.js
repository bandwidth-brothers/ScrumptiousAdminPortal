import { Card } from 'react-bootstrap'
import React, { Component } from 'react'

import userProfile from '../../assets/images/logo-template.jpg'
import styled from 'styled-components'

const StyledImg = styled.img`
  width:120px;
  height: 120px;
`
const StyledCard = styled.div`
    margin-top: 7px;
    margin-bottom: 7px;
`
const StyledCardBody = styled.div`
    display: flex;
    justify-content: space-between;
`
export default class RestaurantCard extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <StyledCard className="card flex-row">
                    <StyledImg
                        className="card-img"
                        src={userProfile} />
                    <StyledCardBody className="card-body">
                        <div className="card-title h2">{this.props.name}</div>
                        <Card.Text>{this.props.address.city}, {this.props.address.state}</Card.Text>
                    </StyledCardBody>
                </StyledCard>
            </div>
        )
    }
}
