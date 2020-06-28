import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import "./header.css"
class Header extends Component {


    render() {
        return (
            <Router>
                <MDBNavbar color="unique-color-dark" >
                    <MDBNavbarBrand href="">
                        <img src="https://i.ibb.co/yXtP0Fg/logo-new-text.png" height="65" alt="" />
                    </MDBNavbarBrand>
                </MDBNavbar>
            </Router>
        );
    }
}

export default Header;