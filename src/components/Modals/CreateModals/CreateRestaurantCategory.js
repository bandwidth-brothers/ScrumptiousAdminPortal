import { Formik } from 'formik'
import React, { useState } from 'react'
import { Form, Button, CloseButton, Row } from 'react-bootstrap'
import * as yup from 'yup'
import styled from 'styled-components'
import axios from 'axios'
import { getAuthToken } from '../../../auth/authAxios'

const schema = yup.object().shape({

})

const StyledRow = styled.div`
    display: flex;
    flex-wrap: nowrap;

    button {
        width: 75px;
    }
`

const CreateRestaurantCategory = (props) => {
    const [categories, setCategories] = useState([
        {
            type: "",
            active: false,
            visible: true
        }
    ])

    const handleAddCategory = (values) => {
        let size = categories.length

        //console.log(size)
        if (values[(size - 1).toString()] !== "") {
            values[(size - 1).toString()] = wordsToUppercase(values[(size - 1).toString()])
            categories[size - 1] = {
                type: values[(size - 1).toString()],
                active: true,
                visible: true
            }

            setCategories([...categories, { type: "", active: false, visible: true }])
            values[(size).toString()] = ""
        }

        // console.log(values)
        //console.log(categories)

    }

    const handleDeleteCategory = (values, i) => {
        // console.log("DELETE")
        //console.log(categories)


        let tmpCategories = categories.map((e, ind) => {
            if (ind === i) {
                return { type: "", active: false, visible: false }
            } else {
                return e
            }
        })
        //console.log(values)
        delete values[i.toString()]
        setCategories(tmpCategories)
        //console.log(values)

    }

    const handleSubmit = (values) => {
        //console.log(props)
        let categoriesList = []
        for (let key in values) {
            if (values[key] !== "") {
                categoriesList.push({
                    type: values[key]
                })
            }
        }
        let categoryCollection = {
            restaurantCategories: categoriesList
        }
        //console.log(categoryCollection)
        const { history } = props
        axios.put("http://localhost:9041" + props.location.pathname, categoryCollection, { headers: { 'Authorization': getAuthToken() } })
            .then(res => {
                //console.log(res.data)
                //console.log(props.history)
                history.push(history.location.pathname.replace("/category-collection", ""))
                //console.log(props.history)

            }).catch(error => {
                console.log(error)
            })
    }

    const wordsToUppercase = (phrase) => {
        let words = phrase.split(" ")

        return words.map((word) => {
            return word[0].toUpperCase() + word.substring(1)
        }).join(" ")
    }

    return (

        <Formik
            initialValues={{
                0: ""
            }}
            onSubmit={values => {
                handleSubmit(values)
            }}
            validationSchema={schema}>
            {({ handleChange, handleSubmit, values, touched, errors, React }) => (
                <>
                    <Form noValidate onSubmit={handleSubmit}>
                        {/* //{console.log(categories.length)} */}
                        <StyledRow>
                            <Form.Label column="lg">Restaurant Categories </Form.Label>
                            <Button
                                variant={Object.keys(values).length > 1 ? "primary" : "secondary"}
                                type="submit"
                                disabled={false}>{Object.keys(values).length > 1 ? "Submit" : "Skip"}</Button>
                        </StyledRow>
                        {categories.map((e, i) => {
                            if (categories[i].visible === true) {
                                return (
                                    <Form.Group className="mb-3" >
                                        <Row>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Placeholder"
                                                name={i.toString()}
                                                value={values[i.toString()]}
                                                onChange={handleChange}
                                                isInvalid={touched.name && errors.name}
                                                className="shrink-form" />
                                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                            <CloseButton
                                                aria-label="Delete"
                                                disabled={values[i.toString()] === "" || categories[i].active !== true}
                                                onClick={() => handleDeleteCategory(values, i)} />
                                        </Row>
                                    </Form.Group>

                                )
                            } else {
                                return null
                            }
                        })}
                    </Form>
                    <Button onClick={() => handleAddCategory(values)}>+ Category</Button>
                </>

            )}

        </Formik>

    )
}

export default CreateRestaurantCategory
