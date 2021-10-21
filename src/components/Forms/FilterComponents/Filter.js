import { Form } from 'react-bootstrap'
import React from 'react'

const Filter = () => {
    return (
        <div>
            <h2>
                Categories
            </h2>
            <Form>
                {["Sandwiches", "American", "Salads"].map(option => (
                    <Form.Check
                        type="checkbox"
                        id={`default-checkbox`}
                        label={option}
                    />
                ))}
            </Form>
        </div>
    )
}

export default Filter
