import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import { setAuthToken } from '../../../Auth/authAxios'

const schema = yup.object().shape({
    username: yup.string().required().label('Email').email('Must be a valid email').max(255),
    password: yup.string().required().label('Password').trim()
})



const Login = (props) => {

    const handleSubmit = (values) => {
        //event.preventDefault()

        console.log("Attempting to Login")
        //console.log(values)
        //console.log(props.match.url)
        axios.post('http://localhost:9040' + props.match.url.replace('/admin', ''), values)
            .then(res => {
                //this.setState({ isSubmitting: false })

                if (res.data.authorities !== "ROLE_ADMIN") {
                    //console.log("NOT ADMIN")
                    props.history.push('/admin/forbidden')
                } else {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('userID', res.data.userId)
                    localStorage.setItem('expiresAt', res.data.expiresAt)
                    // To LOG OFF
                    // localStorage.removeItem('token')
                    setAuthToken(res.data.token)
                    props.history.push('/admin')
                    window.location.reload(true);
                }
            }).catch(err => {
                //this.setState({ isSubmitting: false })
                console.log(err)
            })


    }

    return (
        <Formik
            initialValues={{
                username: "",
                password: ""
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
                        <Form.Label bsPrefix="req-form-label" column="lg">Email </Form.Label>

                        <Form.Control
                            required
                            type="text"
                            placeholder="Email"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={touched.username && errors.username} />
                        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label bsPrefix="req-form-label" column="lg">Password </Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={touched.password && errors.password} />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>


                    <Button
                        variant="primary"
                        type="submit"
                        disabled={touched.username && touched.password && !isValid}>Login</Button>

                </Form>
            )
            }
        </Formik >
    )
}

export default Login
