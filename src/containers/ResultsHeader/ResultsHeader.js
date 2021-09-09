import React, { useState, useEffect } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import styled from 'styled-components'


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
        console.log(show)
    }

    const handleClose = () => {
        setShow(false)
    }

    const childrenWithProps = React.Children.map(props.children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.

        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                show: show,
                onHide: handleClose,
                submitCreate: props.submitCreate
            });
        }
        return child;
    });


    return (
        <StyledContainer className="container-fluid">
            <Row>
                <Col><h1>{props.name}</h1></Col>
                <StyledCol className="col flex">
                    <Button
                        className="far-right"
                        variant="primary"
                        onClick={handleCreateOpen}>
                        {props.buttonText}
                    </Button>
                </StyledCol>

            </Row>
            {childrenWithProps}


            {/* <CreateRestaurant
                show={show}
                onHide={handleClose}
                submitCreate={props.submitCreate} /> */}
        </StyledContainer>
    )

}

export default ResultsHeader