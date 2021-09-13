import React, { Component } from 'react'

export default class Sidebar extends Component {
    render() {
        return (
            <section className="sidebar">
                {this.props.children}
            </section>
        )
    }
}
