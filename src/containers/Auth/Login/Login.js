import React, { } from 'react'
import { Button, Avatar, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CenterDiv from '../../UI/CenterDiv/CenterDiv'

import AuthService from '../../../services/AuthService'
//import { LoggedStateContext } from '../../higher-order-components/Context/Context'
//import { setAuthToken } from '../../../axios'

const schema = yup.object().shape({
    username: yup.string().required().label('Email').email('Must be a valid email').max(255),
    password: yup.string().required().label('Password').trim()
})

const labelStyle = {
    style: {
        backgroundColor: "white",
        padding: "0px 5px"
    }
}

const theme = createTheme();

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

const Login = (props) => {

    //const [logged, setLogged] = useContext(LoggedStateContext);

    const handleSubmit = (values) => {
        console.log("Attempting to Login")
        AuthService.login(values.username, values.password).then(result => {
            console.log(typeof result)
            if (typeof result === "string") {
                console.log(result)
            }
            if (result !== undefined) {
                console.log(result)
                props.history.push('/admin')
                //setLogged(true)
            }
        })

    }

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
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Formik
                            initialValues={{
                                username: "",
                                password: ""
                            }}
                            onSubmit={(values) => {
                                console.log("Submit")
                                console.log(values)
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
                                        id="username"
                                        label="Email Address"
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        helperText={touched.username && errors.username ? (errors.username ? errors.username : " ") : " "}
                                        autoFocus
                                        InputLabelProps={labelStyle}
                                    />
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
                                    {/* <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    /> */}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={touched.username && touched.password && !isValid}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link to="/" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            Don't have an account? <Link to="/admin/register">Sign Up</Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                        </Formik >
                    </Box>

                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </CenterDiv >


    )
}

export default Login
