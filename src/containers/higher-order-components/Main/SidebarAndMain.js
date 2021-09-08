import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'

import Sidebar from '../../Sidebar/Sidebar'
import Filter from '../../../components/Sidebar/Filter'
import Restaurants from '../../Restaurants/Restaurants'
import CreateRestaurantCategory from '../../../components/CreateModal/CreateRestaurant/CreateRestaurantCategory'

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
                    </Col>
                </Row>

            </StyledContainer>
        )
    }
}
