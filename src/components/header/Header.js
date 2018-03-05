import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        let { title } = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/">{ title }</a>
            </nav>
        )
    }
}