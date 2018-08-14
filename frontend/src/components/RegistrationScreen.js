import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {FormGroup, Input, Label, Col} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onChange = (e) => {
        this.props.dispatch({
            type: 'ONCHANGE',
            key: e.target.name,
            payload: e.target.value
        });

    };

    handleLink = (e) => {
        fetch('https://designandsharebackend.herokuapp.com/login/', {
           body: JSON.stringify({
                userName:  this.props.userName,
                password: this.props.password,
                firstName:this.props.firstName,
                lastName:this.props.lastName,
            }),
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin':'*',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }).then(response => {
            console.log(response)})
            .catch(error => console.log(error));

    };


    render() {

        return (
            <div className="main-container">
                <Header/>
                <form className="container" onSubmit={this.onSubmit}>

                    <div>
                        <FormGroup row>
                            <Col sm={2}>
                            </Col>
                            <Col sm={5}>
                                <Label htmlFor="title" style={{fontSize:'20px',fontFamily:'Sans Serif',fontWeight: 'bold'}}>Register</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={2}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontWeight: 'bold'}}>First Name</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" className="form-control" name="firstName" value={this.props.firstName}
                                       onChange={this.onChange.bind(this)} placeholder="First Name"/></Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={2}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontWeight: 'bold'}}>Last Name</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" className="form-control" name="lastName" value={this.props.lastName}
                                       onChange={this.onChange.bind(this)} placeholder="Last Name"/></Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={2}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontWeight: 'bold'}}>User Name</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" className="form-control" name="userName" value={this.props.userName}
                                       onChange={this.onChange.bind(this)} placeholder="User Name"/></Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col sm={2}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="published_date" style={{fontWeight: 'bold'}}>Password</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="password" className="form-control" name="password"
                                       value={this.props.password}
                                       onChange={this.onChange.bind(this)} placeholder="Password"/>
                            </Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>

                            <input type="button"
                                   onClick={this.handleLink.bind(this)} value="Submit"
                                   className="btn btn-success btn-next"/>

                            <Link to="/login"
                                  style={{marginLeft: '40px',color: 'dodgerblue',fontWeight: 'bold'}}>Cancel</Link>&nbsp;

                        </FormGroup>
                    </div>
                </form>
                <Footer/>
            </div>
        );
    }

    static propTypes = {
        userName: PropTypes.string,
        password: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    };
    static defaultProps = {
        userName:'',
        password: '',
        firstName: '',
        lastName: '',
    };
}


function mapStateToProps(state) {
    return {
        userName: state.userName,
        password: state.password,
        firstName: state.firstName,
        lastName: state.lastName,
    };
}

export default withRouter(connect(mapStateToProps)(RegistrationScreen));

