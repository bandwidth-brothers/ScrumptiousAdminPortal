import { Modal, Box, Button, Typography, TextField, FormControl, InputLabel, Select, FormHelperText, MenuItem } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Formik } from 'formik'
import * as yup from 'yup'

import StateSelect from 'components/Forms/StateSelect/StateSelect'
import { getAuthToken } from 'auth/authAxios'
import { RestaurantService } from 'services/RestaurantService'

const schema = yup.object().shape({
    name: yup.string().required().label('Name').max(100, "Name is too long"),
    lineOne: yup.string().required().label('Line One of Address').max(100, "Address is too long"),
    lineTwo: yup.string().label('Line Two of Address').max(100, "Address is too long"),
    city: yup.string().required().label('City').max(90, "City name is too long"),
    state: yup.string().required().label('State').max(2, "State is a required field"),
    restaurantOwnerId: yup.string().required().label('Owner'),
    zip: yup.string().required().label("Zip Code")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, 'Must be exactly 5 digits')
        .max(5, 'Must be exactly 5 digits')
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const labelStyle = {
    style: {
        backgroundColor: "white",
        padding: "0px 5px"
    }
}

const CreateRestaurant = (props) => {

    const [owners, setOwners] = useState([])

    useEffect(() => {
        RestaurantService.getOwnersList()
            .then(response => {
                if (Array.isArray(response.data)) {
                    setOwners(response.data)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const handleSubmit = (values) => {
        //event.preventDefault()

        console.log("Attempting to Create Restaurant")
        console.log(values)
        axios.post('http://localhost:8080/restaurant/admin/restaurants', values, { headers: { 'Authorization': getAuthToken() } })
            .then(res => {
                props.onHide()
                props.submitCreate()
                //props.history.push("/admin/restaurants/" + res.data + "/category-collection")
            }).catch(error => {
                console.log(error)
            })


    }

    const ownersList = owners.map(owner => {
        console.log("OWNER")
        return <MenuItem key={owner.id} value={owner.id}>{owner.firstName} {owner.lastName} : {owner.email}</MenuItem>
    })

    // const handleNameChange = (event) => {
    //     setName(event.target.value)
    // }

    return (
        <Modal
            open={props.show}
            onClose={props.onHide}
            backdrop="static"
            aria-labelledby="modal-modal-title" >
            <Box sx={{ ...style, width: 700 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create New Restaurant
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Please fill out the required fields to create a Restaurant
                </Typography>



                <Formik
                    initialValues={{
                        name: "",
                        lineOne: "",
                        lineTwo: "",
                        city: "",
                        state: "",
                        zip: "",
                        restaurantOwnerId: ""
                    }}
                    onSubmit={(values) => {
                        console.log("Submit")
                        handleSubmit(values)
                    }}
                    validationSchema={schema}
                >
                    {({ handleChange, handleSubmit, values, errors, isValid, touched, isSubmitting }) => (
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>


                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                label="Restaurant Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                helperText={touched.name && errors.name ? (errors.name ? errors.name : " ") : " "}
                                InputLabelProps={labelStyle}
                                autoFocus />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                label="Line One"
                                name="lineOne"
                                value={values.lineOne}
                                onChange={handleChange}
                                helperText={touched.lineOne && errors.lineOne ? (errors.lineOne ? errors.lineOne : " ") : " "}
                                InputLabelProps={labelStyle} />

                            <TextField
                                margin="normal"
                                fullWidth
                                type="text"
                                label="Line Two"
                                name="lineTwo"
                                value={values.lineTwo}
                                onChange={handleChange}
                                helperText={touched.lineTwo && errors.lineTwo ? (errors.lineTwo ? errors.lineTwo : " ") : " "}
                                InputLabelProps={labelStyle} />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                label="City"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                helperText={touched.city && errors.city ? (errors.city ? errors.city : " ") : " "}
                                InputLabelProps={labelStyle} />

                            <StateSelect
                                name="state"
                                value={values.state}
                                onChange={handleChange}
                                isInvalid={touched.state && errors.state}
                                helperText={touched.state && errors.state ? (errors.state ? errors.state : " ") : " "}
                                InputLabelProps={labelStyle} />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                label="Zip Code"
                                name="zip"
                                value={values.zip}
                                onChange={handleChange}
                                helperText={touched.zip && errors.zip ? (errors.zip ? errors.zip : " ") : " "}
                                InputLabelProps={labelStyle} />

                            <FormControl margin="normal" required fullWidth>
                                <InputLabel
                                    id="select-label"
                                    style={labelStyle.style}>Restaurant Owner</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={values.restaurantOwnerId}
                                    name="restaurantOwnerId"
                                    label="Restaurant Owner"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">N/A</MenuItem>
                                    {owners.length !== 0 ? ownersList : null}
                                </Select>
                                <FormHelperText id="helper-text">{touched.restaurantOwnerId && errors.restaurantOwnerId ? (errors.restaurantOwnerId ? errors.restaurantOwnerId : " ") : " "}</FormHelperText>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={touched.name && touched.lineOne && touched.city && touched.state && touched.zip && touched.restaurantOwnerId && !isValid}
                            >
                                Create Restaurant
                            </Button>

                        </Box>
                    )}
                </Formik>
                <Button onClick={props.onHide}>Close</Button>
            </Box>

            {/* <Route path="/admin/restaurants/category-collection" component={CreateRestaurantCategory} /> */}
        </Modal>
    )

}

export default withRouter(CreateRestaurant)