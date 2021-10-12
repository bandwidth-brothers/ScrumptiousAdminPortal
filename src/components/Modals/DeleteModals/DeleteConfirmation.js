import React, { useState } from 'react'
import { Modal, Button, TextField, Box, Typography } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { red } from '@mui/material/colors'

import AuthService from 'services/AuthService'

const schema = yup.object().shape({
    name: yup.string().required().label('Password').trim(),
    password: yup.string().required().label('Password').trim()
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

const DeleteConfirmation = (props) => {
    const [errorMsg, setErrorMsg] = useState("\n")
    const [confirmed, setConfirmed] = useState(false)

    const handleSubmit = (values) => {
        if (values.name === props.name) {
            console.log(values.password)
            AuthService.getAdminPasswordVerification(localStorage.getItem('userID'), values.password).then(res => {
                if (res.data) {
                    props.onHide()
                    props.handleActivation()
                }
            }).catch(err => {
                setErrorMsg("Password is not correct")
                console.log(err.message)
            })
        } else {
            setErrorMsg("Restaurant name does not match")
        }
    }

    const handleClose = () => {
        setConfirmed(false)
        props.onHide()
    }

    return (
        <Modal
            open={props.show}
            onClose={handleClose}
            backdrop="static"
            aria-labelledby="modal-modal-title" >
            <Box sx={{ ...style, width: 700 }}>

                {confirmed ? <>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Deletion Confirmation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Please fill out your password to confirm the deletion of {props.name}
                    </Typography>
                    <Formik
                        initialValues={{
                            name: "",
                            password: "",
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
                                <Typography className="error-msg" style={{
                                    padding: "10px 0px 0px 0px",
                                    color: red[600]
                                }}>{errorMsg}</Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={touched.name && touched.password && !isValid}
                                >
                                    Delete Restaurant
                                </Button>

                            </Box>
                        )}
                    </Formik>
                    <Button onClick={handleClose}>Close</Button>
                </>
                    : <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Attention Before Proceeding
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            This action will delete:
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            - All Menu Items
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            - Order history
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            onClick={() => setConfirmed(confirmed => !confirmed)}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Continue
                        </Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>}
            </Box>

            {/* <Route path="/admin/restaurants/category-collection" component={CreateRestaurantCategory} /> */}
        </Modal>
    )
}

export default DeleteConfirmation
