import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import { Route } from 'react-router-dom'

import Sidebar from '../../Sidebar/Sidebar'
import Filter from '../../../components/Sidebar/Filter'
import Restaurants from '../../Restaurants/Restaurants'
import CreateRestaurantCategory from '../../../components/CreateModal/CreateRestaurant/CreateRestaurantCategory'
import FullRestaurant from '../../../components/Restaurant/FullRestaurant'

const StyledContainer = styled.div`
    margin-top: 25px;
`

export default class SidebarAndMain extends Component {
    render() {
        return (
            <StyledContainer className="container-fluid">
                <Row>
                    <Col md={3}>
                        <Sidebar className="filterSection">
                            <Route exact path="/admin/restaurants" component={Filter} />
                        </Sidebar>
                    </Col>
                    <Col >
                        <Route exact path="/admin/restaurants" component={Restaurants} />
                        <Route exact path="/admin/restaurants/:id/category-collection" component={CreateRestaurantCategory} />
                        <Route exact path="/admin/restaurants/:id" component={FullRestaurant} />

                    </Col>
                </Row>

            </StyledContainer>
        )
    }
}
