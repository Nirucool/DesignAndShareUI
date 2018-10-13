import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {FormGroup, Input, Label, Col} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

function submissionMessage(errors) {
    // store errors for all fields in single array
    var message='';
    if (errors.length===0) {
        message=" User has been registered successfully";
    }

    return message;
}

function validate(firstName, lastName, userName, password, userNameList) {
    // store errors for all fields in single array
    const errors = [];
    if (userName === "") {
        errors.push("Please enter User Name");
    }
    if (firstName === "") {
        errors.push("Please enter First Name");
    }
    if (lastName === "") {
        errors.push("Please enter Last Name");
    }
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const passwordOk = re.test(password);
    if (!passwordOk) {
        errors.push("Invalid password");
    }
    if (userNameList.includes(userName)) {
        errors.push("User Name is already Registered, please choose other User Name");
    }

    return errors;
}

class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginDetails: [],
            userNameList: [],
            passwordList: [],
            firstNameList: [],
            lastNameList: [],
            errors: [],
            message:''
        }
    }

    onChange = (e) => {
        this.props.dispatch({
            type: 'ONCHANGE',
            key: e.target.name,
            payload: e.target.value
        });

    };
    componentDidMount() {

        fetch('https://designandsharebackend.herokuapp.com/login', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }).then(response => response.json())
            .then(result => this.setLoginDetails(result))
            .catch(error => console.log(error));

    };

    setLoginDetails = (result) => {
        this.setState({
            loginDetails: result
        });
        Object.keys(this.state.loginDetails.map((key, id) => {
                this.state.userNameList.push(key.userName);
                this.state.passwordList.push(key.password);
                this.state.firstNameList.push(key.firstName);
                this.state.lastNameList.push(key.lastName);

            }
        ));
    };

    handleLink = (e) => {
        const errors = validate(this.props.firstName, this.props.lastName, this.props.userName,
            this.props.password, this.state.userNameList);
        if (errors.length > 0) {
            this.setState({errors});
            return;
        }
        if (errors.length === 0) {
            this.setState({errors:[]});
            var message = submissionMessage(errors);
            this.setState({message});
            fetch('https://designandsharebackend.herokuapp.com/login/', {
                body: JSON.stringify({
                    userName: this.props.userName,
                    password: this.props.password,
                    firstName: this.props.firstName,
                    lastName: this.props.lastName,
                }),
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },
                withCredentials: true,
                credentials: 'same-origin',
            }).then(response => {
                console.log(response)
            })
                .catch(error => console.log(error));
        }

    };


    render() {
        const {errors,message} = this.state;
        return (
            <div className="main-container">
                <Header/>
                <form className="container" onSubmit={this.onSubmit}>
                    <div style={{marginLeft: '25%', color: 'red'}}>
                        {errors.map(error => (
                            <p key={error}>Error: {error}</p>
                        ))}
                    </div>
                    <div style={{marginLeft: '25%',color: 'green'}}>
                        {message}</div>
                    <div className="container">
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={5}>
                                <Label htmlFor="title" style={{fontSize:'15px',marginTop:'30px',fontWeight: 'bold'}}>Register</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn">First Name</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" style={{fontSize: '12px'}} className="form-control" name="firstName" value={this.props.firstName}
                                       onChange={this.onChange.bind(this)} placeholder="First Name" /></Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontSize: '12px'}}>Last Name</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" style={{fontSize:'12px'}} className="form-control" name="lastName" value={this.props.lastName}
                                       onChange={this.onChange.bind(this)} placeholder="Last Name" /></Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontSize: '12px'}}>User Name</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" style={{fontSize: '12px'}} className="form-control" name="userName" value={this.props.userName}
                                       onChange={this.onChange.bind(this)} placeholder="User Name"/></Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="published_date" style={{fontSize: '12px'}}>Password</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="password" style={{fontSize: '12px'}} className="form-control" name="password"
                                       value={this.props.password}
                                       onChange={this.onChange.bind(this)} placeholder="Password"/>
                            </Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={1}>
                            </Col>
                            <input type="button"
                                   onClick={this.handleLink.bind(this)} value="Submit" style={{fontSize:'12px'}}
                                   className="btn btn-success btn-next"/>

                            <Link to="/login"
                                  style={{marginLeft: '40px',color: 'dodgerblue'}}>Cancel</Link>&nbsp;

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

