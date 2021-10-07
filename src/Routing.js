import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './containers/Auth/Login/Login'
import Logout from './containers/Auth/Logout/Logout'
import Forbidden from './containers/Auth/Forbidden'
import Register from './containers/Auth/Register/Register'

import { useSelector } from 'react-redux'
import Layout from './containers/Layout'
import { LoggedStateContext } from './containers/higher-order-components/Context/Context'

const Routing = () => {
    const [isLogged, setLogged] = useContext(LoggedStateContext);
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (isLogged === null) {
            if (!token) {
                // no token found
                setLogged(false)
                //setAuthToken(null)
                console.log('token NOT FOUND')
            } else {
                setLogged(true)
                //setAuthToken(token)
                console.log('token FOUND')
            }
            isLogged ? console.log("LOGGED IN") : console.log("NOT LOGGED IN")
        }
        //setAuthToken(token)
        setInitialized(true)
    }, [isLogged])

    return (
        <  >

            {initialized ?
                (isLogged ?
                    <Switch>
                        <Route exact path="/admin" component={Layout} />
                        <Route exact path="/admin/restaurants" component={Layout} />
                        <Route exact path="/admin/restaurants/:id" component={Layout} />
                        <Route exact path="/admin/settings" component={Layout} />
                        {/* <Route exact path="/admin/restaurants/:id/category-collection" component={SidebarAndMain} /> */}
                        <Redirect path="/" to="/admin" />
                    </Switch> :
                    < Switch >
                        <Route exact path="/admin/login" component={Login} />
                        <Route exact path="/admin/register" component={Register} />
                        <Route exact path="/admin/logout" component={Logout} />
                        <Route exact path="/admin/forbidden" component={Forbidden} />
                        <Redirect path="/" to="/admin/login" />
                    </ Switch>)
                : null}
        </ >


    )
}

export default Routing
