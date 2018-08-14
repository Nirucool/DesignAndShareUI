import React,{Component} from 'react';
import header from './header.png';
import { Navbar} from 'react-bootstrap';
import {NavbarBrand} from 'reactstrap';
class Header extends Component {
    render() {
        return (
            <Navbar fixedTop style={{backgroundColor:'black'}}>

                    <NavbarBrand>
                        <img src={header} style={{"width": '250px', "height": '40px'}} alt=""/>
                    </NavbarBrand>

            </Navbar>
        );
    }
}


export default Header;