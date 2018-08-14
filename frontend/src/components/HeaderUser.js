import React, {Component} from 'react';
import header from './header.png';
import {Navbar} from 'react-bootstrap';
import {Collapse,NavbarToggler,NavbarBrand,UncontrolledDropdown,DropdownMenu,DropdownItem,DropdownToggle} from 'reactstrap';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

class HeaderUser extends Component {
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
            isOpen: true
        };
    }
    toggle=()=> {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
        render() {
            return (
                <div>
                    <Navbar fixedTop style={{backgroundColor: 'black'}} >

                            <NavbarBrand>
                                <img src={header} style={{"width": '250px', "height": '40px'}} alt=""/>
                            </NavbarBrand>

                        <Collapse isOpen={this.state.isOpen}>
                            <UncontrolledDropdown  style={{color: 'white'}}>
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
                    </Navbar>
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

export default withRouter(connect(mapStateToProps)(HeaderUser));