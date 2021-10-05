import React, { useState, useEffect } from 'react'
//import styled from 'styled-components'

import { Refresh, Search, } from '@mui/icons-material'
import { AppBar, Toolbar, Grid, Button, TextField, Tooltip, IconButton } from '@mui/material'


// const StyledContainer = styled.div`
//     border-bottom: solid 1px grey;
// `

// const StyledCol = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//`

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
                submitCreate: props.reload
            });
        }
        return child;
    });


    return (


        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Search color="inherit" sx={{ display: 'block' }} />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            placeholder="Search by restaurant name"
                            InputProps={{
                                disableUnderline: true,
                                sx: { fontSize: 'default' },
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={handleCreateOpen}>
                            {props.buttonText}
                        </Button>
                        <Tooltip title="Reload">
                            <IconButton onClick={props.reload}>
                                <Refresh color="inherit" sx={{ display: 'block' }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
            {childrenWithProps}
        </AppBar>

        //  <Row>
        //     <Col><h1>{props.name}</h1></Col>
        //     <StyledCol className="col flex">
        //         <Button
        //             className="far-right"
        //             variant="primary"
        //             onClick={handleCreateOpen}>
        //             {props.buttonText}
        //         </Button>
        //     </StyledCol>

        // </Row> 



        // <CreateRestaurant
        //             show={show}
        //             onHide={handleClose}
        //             submitCreate={props.submitCreate} />

    )

}

export default ResultsHeader