import { Modal, Button, Form, InputGroup } from 'react-bootstrap'
import React from 'react'
import { withRouter, Route } from 'react-router-dom'
import axios from 'axios'
import { Formik } from 'formik'
import * as yup from 'yup'

import { getAuthToken } from 'auth/authAxios'
import { MenuService } from 'services/MenuService'

const schema = yup.object().shape({
    name: yup.string().required().label('Name').max(100, "Name is too long"),
    price: yup.string().required().label('Price').trim().matches(/^\d+(?:\.\d{2})$/, "Price is not in correct format")
})

const CreateRestaurant = (props) => {

    const id = props.match.params.id;

    const handleSubmit = (values) => {
        //event.preventDefault()

        console.log("Attempting to Create Menu Item")
        console.log(values)
        console.log(props.location.pathname)
        MenuService.createNewMenuItem(id, values)
            .then(() => {
                props.onHide()
                props.submitCreate()
            })

        // axios.post('http://localhost:9041' + props.location.pathname + '/menu-items', values, { headers: { 'Authorization': getAuthToken() } })
        //     .then(res => {

        //         //props.submitCreate()
        //         props.history.push(props.location.pathname + '/menu-items')
        //         console.log(res.data)

        //     }).catch(error => {
        //         console.log(error)
        //     })


    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton={true}>
                <Modal.Title>Create New Menu Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: "",
                        price: "",
                        isAvailable: true
                    }}
                    onSubmit={(values) => {
                        console.log("Submit")
                        handleSubmit(values)
                    }}
                    validationSchema={schema}
                >
                    {({ handleChange, handleSubmit, values, errors, isValid, touched, isSubmitting, setFieldValue }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label bsPrefix="req-form-label" column="lg">Name </Form.Label>

                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Fried Calamari"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={touched.name && errors.name} />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label bsPrefix="req-form-label" column="lg">Price </Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="13.25"
                                        name="price"
                                        value={values.price}
                                        onChange={e => {
                                            let size = e.currentTarget.value.length
                                            let lastChar = e.currentTarget.value[size - 1]
                                            let numDecimal = e.currentTarget.value.split('.').length - 1
                                            if (isNaN(lastChar)) {
                                                if (lastChar === '.') {
                                                    if (numDecimal > 1) {
                                                        e.currentTarget.value = e.currentTarget.value.slice(0, -1)
                                                    }
                                                } else {
                                                    e.currentTarget.value = e.currentTarget.value.slice(0, -1)
                                                }
                                            } else {
                                                if (numDecimal === 1) {
                                                    let twoDecimalPlace = e.currentTarget.value[size - 4]
                                                    if (twoDecimalPlace === '.') {
                                                        e.currentTarget.value = e.currentTarget.value.slice(0, -1)
                                                    }
                                                }
                                            }
                                            handleChange(e)
                                        }}
                                        isInvalid={touched.price && errors.price} />
                                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    name="isAvailable"
                                    checked={values.isAvailable}
                                    onChange={e => {
                                        setFieldValue('isAvailable', e.target.checked)
                                    }}
                                    label="Available" />
                            </Form.Group>


                            <Button
                                variant="primary"
                                type="submit"
                                disabled={touched.name && touched.price && !isValid}>Submit</Button>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default withRouter(CreateRestaurant)