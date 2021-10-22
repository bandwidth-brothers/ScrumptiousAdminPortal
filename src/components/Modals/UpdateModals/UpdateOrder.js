import { Modal, Box, Button, Typography, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'

import StateSelect from 'components/Forms/StateSelect/StateSelect'
import { OrderService } from 'services/OrderService'

const schema = yup.object().shape({
    orderDiscount: yup.string().required().label('OrderDiscount').trim(),
    preparationStatus: yup.string().required().label('PreparationStatus').trim(),
    requestedDeliveryTime: yup.string().required().label('RequestedDeliveryTime').trim(),

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

const UpdateOrder = (props) => {
    const id = props.match.params.id;

    const [order, setOrder] = useState();

    useEffect(() => {
        if (order === null) {
            OrderService.getOrderById(id)
                .then(function (response) {
                    const re = response.data;
                    setOrder(re);
                    console.log(re);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [id, order])

    const handleSubmit = (values) => {
        //event.preventDefault()

        console.log("Attempting to Update Order")
        console.log(values)

        OrderService.updateOrderById(id, values)
            .then(function (response) {
                console.log(response);
                props.onHide();
                props.submitCreate();
                setOrder({ ...order, ...values })
            })
            .catch(function (error) {
                console.log(error);
            });


    }

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
                    Update Order
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Please fill out the required fields to update this Order
                </Typography>



                <Formik
                    initialValues={{
                        orderDiscount: order?.orderDiscount,
                        preparationStatus: order?.preparationStatus,
                        requestedDeliveryTime: order?.requestedDeliveryTime
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
                                label="Order discount"
                                name="name"
                                value={values.orderDiscount}
                                onChange={handleChange}
                                helperText={touched.orderDiscount && errors.orderDiscount ? (errors.orderDiscount ? errors.orderDiscount : " ") : " "}
                                InputLabelProps={labelStyle}
                                autoFocus />


                            <StateSelect
                                name="state"
                                value={values.preparationStatus}
                                onChange={handleChange}
                                isInvalid={touched.preparationStatus && errors.preparationStatus}
                                helperText={touched.preparationStatus && errors.preparationStatus ? (errors.preparationStatus ? errors.preparationStatus : " ") : " "}
                                InputLabelProps={labelStyle} />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                label="Zip Code"
                                name="zip"
                                value={values.requestedDeliveryTime}
                                onChange={handleChange}
                                helperText={touched.requestedDeliveryTime && errors.requestedDeliveryTime ? (errors.requestedDeliveryTime ? errors.requestedDeliveryTime : " ") : " "}
                                InputLabelProps={labelStyle} />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={touched.orderDiscount && touched.preparationStatus && touched.requestedDeliveryTime && !isValid}
                            >
                                Update Order
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

export default withRouter(UpdateOrder)