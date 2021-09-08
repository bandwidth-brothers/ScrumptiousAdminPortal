import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'
import styled from 'styled-components'

import CreateRestaurant from '../../components/CreateModal/CreateRestaurant/CreateRestaurant';

const StyledContainer = styled.div`
    border-bottom: solid 1px grey;
`

const StyledCol = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const ResultsHeader = (props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {

    }, [])

    const handleCreateOpen = () => {
        setShow(true)
        console.log("HELLO")
    }

    const handleClose = () => {
        setShow(false)
    }



    return (
        <StyledContainer className="container-fluid">
            <Row>
                <Col><h1>{props.name}</h1></Col>
                <StyledCol className="col flex">
                    <Button
                        className="far-right"
                        variant="primary"
                        onClick={handleCreateOpen}>
                        + Restaurant
                    </Button>
                </StyledCol>

            </Row>
            <CreateRestaurant
                show={show}
                onHide={handleClose}
                submitCreate={props.submitCreate} />
        </StyledContainer>
    )

}

export default ResultsHeader