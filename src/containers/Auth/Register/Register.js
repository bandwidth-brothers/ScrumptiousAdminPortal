import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import CenterDiv from '../../UI/CenterDiv/CenterDiv'
import { StyledFormBox } from '../../../AppStyling'

const schema = yup.object().shape({
    firstName: yup.string().required().label('First Name').max(255),
    lastName: yup.string().required().label('Last Name').max(255),
    email: yup.string().required().label('Email').email('Must be a valid email').max(255),
    password: yup.string().required().label('Password').trim()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-_=+,.?])[A-Za-z\d!@#$%^&*\-_=+,.?]{10,128}$/,
            "Password must be between 10 and 128 characters,"
            + " contain at least one lowercase letter,"
            + " at least one uppercase letter,"
            + " at least one number,"
            + " and at least one special character from the following: !@#$%^&*-_=+,.?"),
    phone: yup.string().required().label('Phone number').min(13, 'Phone number must be complete'),

})


const Register = (props) => {

    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = (values) => {
        //event.preventDefault()

        console.log("Attempting to Register")
        console.log(values)
        let registerUrl = '/accounts/register/admin'
        axios.post('http://localhost:9040' + registerUrl, values)
            .then(res => {
                //this.setState({ isSubmitting: false })
                // To LOG OFF
                // localStorage.removeItem('token')
                //setAuthToken(res.data.token)
                console.log(res.data)
                props.history.push('/admin/login')
                //window.location.reload(true);

            }).catch(err => {
                //console.log(err.response.status)
                if (err.response.status === 500) {
                    setErrorMsg("The email already exists in the system or something went wrong.")
                    console.log(err)
                } else {
                    console.log(err)
                }
                //this.setState({ isSubmitting: false })
            })


    }

    return (
        <CenterDiv>
            <StyledFormBox>

                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        phone: ""
                    }}
                    onSubmit={(values) => {
                        console.log("Submit")
                        handleSubmit(values)
                    }}
                    validationSchema={schema}
                >
                    {({ handleChange, handleSubmit, values, errors, isValid, touched, isSubmitting, setFieldValue }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Label column="lg" className="title"> Register </Form.Label>
                            <Form.Group className="formGroup">
                                <Form.Label bsPrefix="req-form-label" column="md">Name </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="John"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    isInvalid={touched.firstName && errors.firstName} />

                                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Doe"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    isInvalid={touched.lastName && errors.lastName} />
                                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="formGroup">
                                <Form.Label bsPrefix="req-form-label" column="md">Email </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={touched.email && errors.email} />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="formGroup">
                                <Form.Label bsPrefix="req-form-label" column="md">Password </Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={touched.password && errors.password} />
                                {!errors.password ?
                                    <Form.Text id="passwordHelpBlock" muted>Password must be between 10 and 128 characters,"
                                        + " contain at least one lowercase letter,"
                                        + " at least one uppercase letter,"
                                        + " at least one number,"
                                        + " and at least one special character from the following: !@#$%^&*-_=+,.?</Form.Text> : null}
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="formGroup">
                                <Form.Label bsPrefix="req-form-label" column="md">Phone </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="(973)201-5424"
                                    name="phone"
                                    value={values.phone}
                                    onChange={e => {
                                        let size = e.currentTarget.value.length
                                        let lastChar = e.currentTarget.value[size - 1]
                                        if (size < 14 && !isNaN(lastChar)) {
                                            console.log("B")
                                            switch (size) {
                                                case 1:
                                                    e.currentTarget.value = "(" + e.currentTarget.value
                                                    break;
                                                case 5:
                                                    e.currentTarget.value = e.currentTarget.value.slice(0, -1) + ")" + lastChar
                                                    break;
                                                case 9:
                                                    e.currentTarget.value = e.currentTarget.value.slice(0, -1) + "-" + lastChar
                                                    break;
                                                default:
                                                    break;
                                            }
                                        } else {
                                            e.currentTarget.value = e.currentTarget.value.slice(0, -1)
                                        }
                                        if (size === 1 && lastChar === "(") {
                                            e.currentTarget.value = ""
                                        }
                                        handleChange(e)
                                    }
                                    }
                                    isInvalid={touched.phone && errors.phone} />
                                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                            </Form.Group>
                            <div>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={touched.username && touched.password && !isValid}>Register</Button>
                                <Form.Text>Already have an account? <Link to="/admin/login">Login</Link> here.</Form.Text>
                            </div>
                            <Form.Text className="error-msg">{errorMsg}</Form.Text>
                        </Form>

                    )
                    }
                </Formik >
            </StyledFormBox>
        </CenterDiv>
    )
}



export default Register
