import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import { FormGroup, Input, Label, Col} from 'reactstrap';
import {connect} from 'react-redux';
import {userActions} from '../actions';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';


class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {loginDetails:[],
            userNameList:[],
            passwordList:[],
            firstNameList:[],
            lastNameList:[]
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
        Object.keys(this.state.loginDetails.map((key,id)=>{
            this.state.userNameList.push(key.userName);
            this.state.passwordList.push(key.password);
            this.state.firstNameList.push(key.firstName);
            this.state.lastNameList.push(key.lastName);

            }
        ));
    };




    handleLink = (e) => {
        e.preventDefault();
        let index=0;
        this.state.userNameList.map((key,id)=>{
            if(key===(this.props.userName))
            {
               index=id;
            }
        });
        const {dispatch} = this.props;
        if(this.state.passwordList[index]===this.props.password) {
            this.props.dispatch(userActions.loginRequest(this.state));
        }
    };


    render() {

        return (
            <div>
            <Header/>
            <form className="container">

                <div className="container">
                <FormGroup row>
                    <Col sm={2}>
                    </Col>
                    <Col sm={5}>
                        <Label htmlFor="title" style={{color: 'black',fontSize:'20px',fontFamily:'Sans Serif',fontWeight: 'bold'}}>Login</Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={2}>
                    </Col>
                    <Col sm={2}>
                    <Label htmlFor="userName" style={{fontWeight: 'bold'}}>User Name</Label>
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
                    <Label htmlFor="password" style={{fontWeight: 'bold'}}>Password</Label>
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
                    <Link to="/registration"
                          style={{marginLeft: '40px',color: 'dodgerblue',fontWeight: 'bold'}}>Register</Link>&nbsp;
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

