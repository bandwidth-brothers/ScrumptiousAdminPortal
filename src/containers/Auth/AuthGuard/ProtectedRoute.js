import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthService from '../../../services/AuthService'

const ProtectedRoute = ({ component: Component, disabledOnLoggedIn, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (AuthService.isLoggedIn()) {
                    if (disabledOnLoggedIn) {
                        return <Redirect to={
                            {
                                pathname: "/admin",
                                state: {
                                    from: props.location
                                }
                            }
                        } />
                    } else {
                        return <Component {...props} />
                    }
                } else {
                    if (!disabledOnLoggedIn) {
                        return <Redirect to={
                            {
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }
                        } />
                    } else {
                        return <Component {...props} />
                    }
                }
            }
            }
        >

        </Route >
    )
}

ProtectedRoute.defaultProps = {
    disabledOnLoggedIn: false
};


export default ProtectedRoute
