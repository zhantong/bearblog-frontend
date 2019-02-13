import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavbarService from "../api/navbar";
import ReactHtmlParser from 'react-html-parser';

export default class TheNavbar extends React.Component {
    static async getInitialProps() {
        return await NavbarService.get();
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">{this.props.brand}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav"/>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                        {this.props.items.map(item =>
                            <Nav.Link href={item.link}>{item.name}</Nav.Link>
                        )}
                    </Nav>
                    {this.props.templates.map(template =>
                        ReactHtmlParser(template.template)
                    )}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}