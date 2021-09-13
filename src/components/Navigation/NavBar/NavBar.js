import { Navbar, Nav, Container, NavDropdown, FormControl, Form, Button } from 'react-bootstrap';
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getAuthToken } from '../../../Auth/authAxios';

import UserDropdown from '../NavigationItems/UserDropdown';


const NavBar = (props) => {

    const logoutHandler = () => {
        axios.post('http://localhost:9040/logout', {}, { headers: { 'Authorization': getAuthToken() } })
            .then((res) => {
                console.log(res)
                console.log("TEST")
                window.location.reload(true);
            }).catch((e) => {
                console.log(e)

            })
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        localStorage.removeItem('expiresAt')
        console.log('LOGGEDOUT')
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Scrumptious</Navbar.Brand>
                    {props.isLoggedIn ?
                        <div>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="mr-2"
                                    aria-label="Search" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#features">Restaurants</Nav.Link>
                                    <Nav.Link href="#pricing">Customers</Nav.Link>
                                    <Nav.Link href="#pricing">Drivers</Nav.Link>
                                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </div> : null}

                    <Nav>
                        {props.isLoggedIn ?
                            <Navbar.Text>
                                'Signed in as "ADMIN"' <Link to="/admin/logout" onClick={logoutHandler}>Logout</Link>
                            </Navbar.Text> :
                            <Navbar.Text>
                                <Link to="/admin/login" >Login</Link>
                            </Navbar.Text>
                        }
                        <UserDropdown />
                    </Nav>
                </Container>
            </Navbar>
        </header >
    )
}

export default NavBar
