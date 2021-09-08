import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import React, { useState } from 'react'
import { withRouter, Route } from 'react-router-dom'
import axios from 'axios'
import { Formik } from 'formik'
import * as yup from 'yup'

import StateSelect from '../Common/StateSelect'
import CreateRestaurantCategory from './CreateRestaurantCategory'

const schema = yup.object().shape({
    name: yup.string().required().label('Name').max(100, "Name is too long"),
    lineOne: yup.string().required().label('Line One of Address').max(100, "Address is too long"),
    lineTwo: yup.string().label('Line Two of Address').max(100, "Address is too long"),
    city: yup.string().required().label('City').max(90, "City name is too long"),
    state: yup.string().required().label('State').max(2, "State is a required field"),
    zip: yup.string().required().label("Zip Code")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, 'Must be exactly 5 digits')
        .max(5, 'Must be exactly 5 digits')
})

const CreateRestaurant = (props) => {

    const handleSubmit = (values) => {
        //event.preventDefault()

        console.log("Attempting to Create Restaurant")
        console.log(values)
        console.log(props.history)
        axios.post('http://localhost:9041/admin/restaurants', values, { headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJVc2VySWQiOiJjMjI1YTE3OC1mNDdmLTRkNGQtOGUzNi1lNmMzZTk2MmRlOGUiLCJBdXRob3JpdGllcyI6IlJPTEVfQURNSU4iLCJleHAiOjE2MzE0NzIyNTB9.zRalXLueNHSxnvORSTfQo9-U_ol2pqoqcx9sVc_EfvNS_noZ5yVTEixWrHk8xiBVqF2SkIUrniifBg5Bzzc22g' } })
            .then(res => {
                props.onHide()
                props.submitCreate()
                props.history.push("/admin/restaurants/" + res.data + "/category-collection")
            }).catch(error => {
                console.log(error)
            })


    }

    // const handleNameChange = (event) => {
    //     setName(event.target.value)
    // }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton={true}>
                <Modal.Title>Create New Restaurant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: "",
                        lineOne: "",
                        lineTwo: "",
                        city: "",
                        state: "",
                        zip: ""
                    }}
                    onSubmit={(values) => {
                        console.log("Submit")
                        handleSubmit(values)
                    }}
                    validationSchema={schema}
                >
                    {({ handleChange, handleSubmit, values, errors, isValid, touched, isSubmitting }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label bsPrefix="req-form-label" column="lg">Name </Form.Label>

                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Smoothie Palace"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={touched.name && errors.name} />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Label column="lg">Address</Form.Label>

                            <Form.Group className="mb-3" >

                                <Form.Label bsPrefix="req-form-label" column="sm" lg={2}>Line One</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="21 E Concord Ave."
                                    name="lineOne"
                                    value={values.lineOne}
                                    onChange={handleChange}
                                    isInvalid={touched.lineOne && errors.lineOne} />
                                <Form.Control.Feedback type="invalid">{errors.lineOne}</Form.Control.Feedback>
                                <Form.Label column="sm" lg={2}>Line Two</Form.Label>

                                <Form.Control
                                    type="text"
                                    placeholder="2nd Fl."
                                    name="lineTwo"
                                    value={values.lineTwo}
                                    onChange={handleChange}
                                    isInvalid={touched.lineTwo && errors.lineTwo} />
                                <Form.Control.Feedback type="invalid">{errors.lineTwo}</Form.Control.Feedback>
                            </Form.Group>



                            <Form.Group className="mb-3" >
                                <Form.Label bsPrefix="req-form-label" column="sm" lg={2}>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Richmond"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    isInvalid={touched.city && errors.city} />
                                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label bsPrefix="req-form-label" column="sm" lg={2}>State</Form.Label>
                                <StateSelect
                                    component="select"
                                    name="state"
                                    value={values.state}
                                    onChange={handleChange}
                                    isInvalid={touched.state && errors.state} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label bsPrefix="req-form-label" column="sm" lg={2}>Zip Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="13123"
                                    name="zip"
                                    value={values.zip}
                                    onChange={handleChange}
                                    isInvalid={touched.zip && errors.zip} />
                                <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>

                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={touched.name && touched.lineOne && touched.city && touched.state && touched.zip && !isValid}>Submit</Button>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
            <Route path="/admin/restaurants/category-collection" component={CreateRestaurantCategory} />
        </Modal>
    )

}

export default withRouter(CreateRestaurant)