import React, {Component} from 'react';
import header from './header.png';
import {Navbar} from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {
    Collapse,
    NavbarToggler,
    NavbarBrand,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Iframe from 'react-iframe';

class HeaderPages extends Component {
    handleLink = (e) => {
        this.props.dispatch({
            type: 'UPDATE_FIRSTNAME',
            payload: this.props.firstName
        });
        this.props.dispatch({
            type: 'UPDATE_LASTNAME',
            payload: this.props.lastName
        });
    };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: true,
            open: false,
        };
    }
    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    handleDrawerClick() {
        if (this.state.open === false)
            this.setState({open: true});
        else
            this.setState({open: false});
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar style={{backgroundColor: 'black'}}
                            title={<img src={header} style={{marginLeft:'200px',"width": '250px', "height": '40px'}} alt="Logo"/>}
                            onLeftIconButtonClick={this.handleDrawerClick.bind(this)}>
                        {/* <NavbarBrand>
                        <img src={header} style={{"width": '50px', "height": '50px'}} alt=""/>
                    </NavbarBrand>*/}

                        <Collapse isOpen={this.state.isOpen}>
                            <UncontrolledDropdown  style={{marginRight:'200px',color: 'white'}}>
                                {this.props.firstName} {this.props.lastName}
                                <DropdownToggle nav caret>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/home" onClick={this.handleLink}>Home</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/profile" onClick={this.handleLink}>My Profile</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/login" onClick={this.handleLink}>Log out</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Collapse>
                        <Drawer open={this.state.open}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z"/></svg>
                            </IconButton>
                            <MenuItem><a className="nav-link" href="/patioDesign"
                                         style={{color: 'black', backgroundColor: '#17a2b8'}}>Patio Design</a></MenuItem>
                            <MenuItem><a className="nav-link" href="/bedroomDesign"
                                         style={{color: 'white', backgroundColor: 'black'}}>Bedroom Design</a></MenuItem>
                            <MenuItem><a className="nav-link" href="/kitchenDesign"
                                         style={{color: 'black', backgroundColor: '#17a2b8'}}>Kitchen Design</a></MenuItem>
                            <MenuItem><a className="nav-link" href="/kitchenGardenDesign"
                                         style={{color: 'white', backgroundColor: 'black'}}>Kitchen Garden Design</a></MenuItem>
                            <MenuItem><a className="nav-link" href="/kidsRoomDesign"
                                         style={{color: 'black', backgroundColor: '#17a2b8'}}>Kids Room Design</a></MenuItem>
                            <MenuItem><a className="nav-link" href="/livingRoomDesign"
                                         style={{color: 'white', backgroundColor: 'black'}}>Living Room Design</a></MenuItem>
                            <MenuItem><a className="nav-link" href="/diy"
                                         style={{color: 'black', backgroundColor: '#17a2b8'}}>Do It YourSelf</a></MenuItem>


                            <MenuItem><Iframe url="https://giphy.com/embed/ftxG9wXu6RpbW" width="220" height="200"
                                        style="position:absolute" frameBorder="0" className="giphy-embed"
                            /></MenuItem>



                        </Drawer>

                    </AppBar>
                </MuiThemeProvider>

            </div>


        );

    }
    static propTypes = {
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    };
    static defaultProps = {

    };

}

NavbarToggler.propTypes = {
    type: PropTypes.string,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

function mapStateToProps(state) {
    return {
        firstName: state.firstName,
        lastName: state.lastName,
        userName: state.userName,
        password: state.password,
    };
}

export default withRouter(connect(mapStateToProps)(HeaderPages));