import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {FormGroup, Input, Label, Col} from 'reactstrap';
import {connect} from 'react-redux';
import {userActions} from '../actions';
import PropTypes from 'prop-types';
import Edit from './edit.jpg';
import HeaderUser from './HeaderUser';
import Footer from './Footer';
function submissionMessage(errors) {
    // store errors for all fields in single array
    var message='';
    if (errors.length===0) {
        message=" User has been saved successfully";
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

    return errors;
}


class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {isEditing: false,
            userName:  this.props.userName,
            password: this.props.password,
            firstName:this.props.firstName,
            lastName:this.props.lastName,
            file: '',
            userNameList:[],
            passwordList:[],
            firstNameList:[],
            lastNameList:[],
            profilePicture:[],
            profilePhoto: this.props.profilePhoto,
            userDetails:[],errors:[],message:''};
        this.toggleEdit = this.toggleEdit.bind(this);
    }
    componentDidMount() {
        fetch('https://designandsharebackend.herokuapp.com/user/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }).then(response => response.json())
            .then(result => this.setUserDetails(result))
            .catch(error => console.log(error));

    };
    setUserDetails = (result) => {
        this.setState({
            userDetails: result
        });
        Object.keys(this.state.userDetails.map((key,id)=>{
                this.state.userNameList.push(key.userName);
                this.state.passwordList.push(key.password);
                this.state.firstNameList.push(key.firstName);
                this.state.lastNameList.push(key.lastName);
                this.state.profilePicture.push(key.profilePhoto);
            }
        ));
        let index=0;
        this.state.userNameList.map((key,id)=>{
            if(key===this.state.userName)
            {
                index=id;
            }
        });
        if(this.state.profilePicture[index]!==undefined || this.state.profilePicture[index]!=="")
        {
            this.state.profilePhoto=this.state.profilePicture[index];
            this.setState({
                profilePhoto:  this.state.profilePhoto
            });
            this.props.dispatch({
                type: 'UPDATE_PHOTO',
                payload: this.state.profilePhoto
            });
        }
    };
    onChange = (e) => {
        this.props.dispatch({
            type: 'ONCHANGE',
            key: e.target.name,
            payload: e.target.value
        });

    };

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.state.file=file;
            this.state.profilePhoto=reader.result;
            this.setState({
                file: this.state.file,
                profilePhoto:  this.state.profilePhoto
            });
            console.log(this.state.profilePhoto);
        };

        reader.readAsDataURL(file);
    }
    saveProfile(event) {
        event.preventDefault();
        const errors = validate(this.props.firstName, this.props.lastName, this.props.userName,
            this.props.password, this.state.userNameList);
        if (errors.length > 0) {
            this.setState({errors});
            return;
        }
        if (errors.length === 0) {
            this.setState({errors: []});
            var message = submissionMessage(errors);
            this.setState({message});
            this.setState({isEditing: false});
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

            fetch('https://designandsharebackend.herokuapp.com/user/', {
                body: JSON.stringify({
                    userName:  this.props.userName,
                    password: this.props.password,
                    firstName:this.props.firstName,
                    lastName:this.props.lastName,
                    profilePhoto:this.state.profilePhoto
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

            const {dispatch} = this.props;
            this.props.dispatch(userActions.updateProfile(this.state));
            this.props.dispatch({
                type: 'UPDATE_PHOTO',
                payload: this.state.profilePhoto
            });
        }

    }
    toggleEdit(){
        this.setState({isEditing: !this.state.isEditing})
    };

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({userName: nextProps.userName,
                password: nextProps.password,
                firstName:nextProps.firstName,
                lastName:nextProps.lastName});
        }

    }
    render() {
        let {profilePhoto,errors,message} = this.state;
        let $imagePreview = null;
        if (profilePhoto) {
            $imagePreview = (<img className="img-profile" src={profilePhoto} />);
        } else {
            $imagePreview = (<div className="previewText">Please select Profile Photo</div>);
        }
        if (this.state.isEditing) {
            return (
                <div className="main-container">

                    <HeaderUser/>
                    <form encType="multipart/form-data" className="container" onSubmit={this.onSubmit}>
                        <div style={{marginLeft: '25%', color: 'red'}}>
                            {errors.map(error => (
                                <p key={error}>Error: {error}</p>
                            ))}
                        </div>
                        <div style={{marginLeft: '25%',color: 'green'}}>
                            {message}</div>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>

                            <div className="previewComponent">
                                <input className="fileInput"
                                       type="file"  style={{marginLeft:'50%',width:'65%'}}
                                       onChange={(e)=>this.handleImageChange(e)} />

                                <div className="imgPreview">
                                    {$imagePreview}
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={5}>
                                <Label htmlFor="title" style={{fontSize:'15px',fontFamily:'Sans Serif',fontWeight: 'bold'}}>My Profile</Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontWeight: 'bold'}}>First Name</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" style={{fontSize:'12px'}} className="form-control" name="firstName" value={this.props.firstName}
                                       onChange={this.onChange.bind(this)} placeholder="First Name"/></Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontWeight: 'bold'}}>Last Name</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="text" style={{fontSize:'12px'}} className="form-control" name="lastName" value={this.props.lastName}
                                       onChange={this.onChange.bind(this)} placeholder="Last Name"/></Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontWeight: 'bold'}}>User Name</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="text"  style={{fontSize:'12px'}} className="form-control" name="userName" value={this.props.userName}
                                       onChange={this.onChange.bind(this)} placeholder="User Name"/></Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="published_date" style={{fontWeight: 'bold'}}>Password</Label>
                            </Col>
                            <Col sm={3}>
                                <Input type="password"  style={{fontSize:'12px'}} className="form-control" name="password"
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
                                   onClick={this.saveProfile.bind(this)}  style={{fontSize:'12px'}} value="Save"
                                   className="btn btn-success btn-next"/>
                        </FormGroup>

                    </form>
                    <Footer/>
                </div>
            )
        }
        return (
            <div className="main-container">

                <HeaderUser/>
                <form encType="multipart/form-data" className="container" onSubmit={this.onSubmit}>

                    <div>
                        <FormGroup row>
                            <Col sm={4}>
                            </Col>
                            <div className="previewComponent">

                                <div className="imgPreview ">
                                    {<img className="img-profile" src={this.state.profilePhoto} />}
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="title" style={{fontSize:'15px',fontFamily:'Sans Serif',fontWeight: 'bold'}}>My Profile</Label>
                            </Col>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}> <img src={Edit} alt="" className="image-del" onClick={this.toggleEdit}/>
                            </Col>

                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontWeight: 'bold'}}>First Name</Label>
                            </Col>
                            <Col sm={3} style={{textAlign:'center'}}>
                                {this.props.firstName}</Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontWeight: 'bold'}}>Last Name</Label>
                            </Col>
                            <Col sm={3} style={{textAlign:'center'}}>
                                {this.props.lastName}</Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="isbn" style={{fontWeight: 'bold'}}>User Name</Label>
                            </Col>
                            <Col sm={3} style={{textAlign:'center'}}>
                                {this.props.userName}</Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={2}>
                                <Label htmlFor="published_date" style={{fontWeight: 'bold'}}>Password</Label>
                            </Col>
                            <Col sm={3} style={{textAlign:'center'}}>
                                {this.props.password}</Col>
                            <Col sm={2}>
                            </Col>
                        </FormGroup>
                        <FormGroup row>



                        </FormGroup>
                    </div>
                </form>
                <Footer/>
            </div>
        );
    }
    static propTypes = {
        userName: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        profilePhoto: PropTypes.string,
    };
}


function mapStateToProps(state) {
    return {
        userName: state.userName,
        password: state.password,
        firstName: state.firstName,
        lastName: state.lastName,
        profilePhoto:state.profilePhoto,
    };
}

export default withRouter(connect(mapStateToProps)(ProfileScreen));

