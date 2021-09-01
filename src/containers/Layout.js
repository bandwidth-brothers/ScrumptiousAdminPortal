import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import Main from './higher-order-components/Main/Main'

export default class Layout extends Component {
    render() {
        return (
            <Main>
                <Switch>
                    <Route exact path="/" component={}/>
                </Switch>
            </Main>
        )
    }
}
