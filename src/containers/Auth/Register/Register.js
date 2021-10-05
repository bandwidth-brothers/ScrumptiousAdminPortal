import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import { Button, Avatar, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material'
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors'

import CenterDiv from '../../UI/CenterDiv/CenterDiv'




const schema = yup.object().shape({
    firstName: yup.string().required().label('First Name').max(255),
    lastName: yup.string().required().label('Last Name').max(255),
    email: yup.string().required().label('Email').email('Must be a valid email').max(255),
    password: yup.string().required().label('Password').trim()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-_=+,.?])[A-Za-z\d!@#$%^&*\-_=+,.?]{10,128}$/, "Password must be: \nbetween 10 and 128 characters,"
            + " \ncontain at least one lowercase letter,"
            + " \nat least one uppercase letter,"
            + " \nat least one number,"
            + " \nat least one special character from the following: !@#$%^&*-_=+,.?"),
    phone: yup.string().required().label('Phone number').min(13, 'Phone number must be complete'),

})

const labelStyle = {
    style: {
        backgroundColor: "white",
        padding: "0px 5px"
    }
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="https://material-ui.com/">
                Scrumptious
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const Register = (props) => {

    const [errorMsg, setErrorMsg] = useState("\n")

    const handleSubmit = (values) => {
        //event.preventDefault()

        console.log("Attempting to Register")
        console.log(values)
        axios.post('http://localhost:8080/restaurant/admin/register', values)
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


    const passText =
        <div>
            <Typography variant="caption" display="block">Password must be:</Typography>
            <Typography variant="caption" display="block">- between 10 and 128 characters,</Typography>
            <Typography variant="caption" display="block">- contain at least one lowercase letter,</Typography>
            <Typography variant="caption" display="block">- at least one uppercase letter,</Typography>
            <Typography variant="caption" display="block">- at least one number,</Typography>
            <Typography variant="caption" display="block">- at least one special character from the following: !@#$%^&*-_=+,.?</Typography>
        </div>

    return (
        <CenterDiv>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

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
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                                    <TextField
                                        style={{ marginTop: "10px" }}
                                        required
                                        fullWidth
                                        type="text"
                                        label="First Name"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        helperText={touched.firstName && errors.firstName ? (errors.firstName ? errors.firstName : " ") : " "}
                                        InputLabelProps={labelStyle}
                                        autoFocus />
                                    <TextField
                                        style={{ marginTop: "10px" }}
                                        required
                                        fullWidth
                                        type="text"
                                        label="Last Name"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        helperText={touched.lastName && errors.lastName ? (errors.lastName ? errors.lastName : " ") : " "}
                                        InputLabelProps={labelStyle}
                                    />
                                    <TextField
                                        style={{ marginTop: "10px" }}
                                        required
                                        fullWidth
                                        id="username"
                                        label="Email Address"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        helperText={touched.email && errors.email ? (errors.email ? errors.email : " ") : " "}

                                        InputLabelProps={labelStyle}
                                    />
                                    {!errors.password ? <div>{passText}</div> : null}
                                    <TextField
                                        style={{ marginTop: "10px" }}
                                        required
                                        fullWidth
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        label="Password"
                                        type="password"
                                        id="password"
                                        helperText={touched.password && errors.password ? (errors.password ? errors.password : " ") : " "}
                                        autoComplete="current-password"
                                        InputLabelProps={labelStyle}
                                    />
                                    <TextField
                                        style={{ marginTop: "10px" }}
                                        required
                                        fullWidth
                                        type="text"
                                        label="Phone Number"
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
                                        }}
                                        helperText={touched.phone && errors.phone ? (errors.phone ? errors.phone : " ") : " "}
                                        InputLabelProps={labelStyle}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={touched.email && touched.password && touched.firstName && touched.lastName && touched.phone && !isValid}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            Already have an account? <Link to="/admin/login" >Sign in</Link>
                                        </Grid>
                                    </Grid>
                                    <Typography className="error-msg" style={{
                                        padding: "10px 0px 0px 0px",
                                        color: red[600]
                                    }}>{errorMsg}</Typography>
                                </Box>
                            )}
                        </Formik >
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </CenterDiv>
    )
}

export default Register