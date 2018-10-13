import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {FormGroup, Input, Label, Col} from 'reactstrap';
import {connect} from 'react-redux';
import {userActions} from '../actions';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import Iframe from 'react-iframe';

function validate(userName, password, userNameList, passwordList) {
    // store errors for all fields in single array
    const errors = [];
    console.log(password);

    if (userName === "") {
        errors.push("Please enter User Name");
    }
    if (!(userNameList.includes(userName))) {
        errors.push("User Name does not exist");
    }
    let index = -1;
    userNameList.map((keys, id) => {
        if (keys === userName) {
            index = id;
        }
    });
    if (!(passwordList[index] === password) && userNameList.includes(userName)) {
        errors.push("Password is incorrect");
    }

    return errors;
}

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginDetails: [],
            userNameList: [],
            passwordList: [],
            firstNameList: [],
            lastNameList: [],
            errors: [],
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

        fetch('https://designandsharebackend.herokuapp.com/login/', {
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
        e.preventDefault();
        const errors = validate( this.props.userName, this.props.password,this.state.userNameList, this.state.passwordList);
        if (errors.length > 0) {
            this.setState({errors});
            return;
        }
        if (errors.length === 0) {
            this.setState({errors:[]});
            let index = 0;
            this.state.userNameList.map((key, id) => {
                if (key === (this.props.userName)) {
                    index = id;
                }
            });
            const {dispatch} = this.props;
            if (this.state.passwordList[index] === this.props.password) {
                this.props.dispatch(userActions.loginRequest(this.state));
            }
        }
    };


    render() {
        const {errors} = this.state;

        return (
            <div>
                <Header/>
                <form className="container">
                    <div style={{marginLeft: '35%', color: 'red'}}>
                        {errors.map(error => (
                            <p key={error}>Error: {error}</p>
                        ))}
                    </div>
                    <div className="container">
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={5}>
                                <Label htmlFor="title" style={{
                                    marginTop: '50px',
                                    color: 'black',
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                }}>Login</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="userName" style={{fontSize: '15px'}}>User Name</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" className="form-control" name="userName" value={this.props.userName}
                                       onChange={this.onChange.bind(this)} placeholder="User Name"
                                       style={{fontSize: '15px'}}/></Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="password" style={{fontSize: '15px'}}>Password</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="password" className="form-control" name="password"
                                       value={this.props.password}
                                       onChange={this.onChange.bind(this)} placeholder="Password"
                                       style={{fontSize: '15px'}}/>
                            </Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={1}>
                            </Col>
                            <input type="button"
                                   onClick={this.handleLink.bind(this)} value="Submit"
                                   className="btn btn-success btn-next"/>
                            <Link to="/registration"
                                  style={{marginLeft: '40px', color: 'dodgerblue'}}>Register</Link>&nbsp;
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={4}>
                                <Iframe url="https://giphy.com/embed/NzYVvp40I3EGc" width="430" height="300" frameBorder="0"
                                        className="giphy-embed"/>
                            </Col>
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
    };
    static defaultProps = {
        userName:'',
        password:'',
    };
}


function mapStateToProps(state) {
    return {
        userName: state.userName,
        password: state.password,
    };
}

export default withRouter(connect(mapStateToProps)(LoginScreen));

