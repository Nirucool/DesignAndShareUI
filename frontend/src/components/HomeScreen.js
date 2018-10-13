import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import HeaderUser from './HeaderUser';
import Footer from './Footer';
import {CardDeck} from 'reactstrap';
import {Typography,Card,CardMedia,CardContent} from '@material-ui/core';


class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginDetails: [],
            userNameList: [],
            passwordList: [],
            firstNameList: [],
            lastNameList: [],
            imageDataList: [],
            typeList: [],
            firstName: '',
            lastName: '',
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

        fetch('https://designandsharebackend.herokuapp.com/image/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }).then(response => response.json())
            .then(result => this.setImageDetails(result))
            .catch(error => console.log(error));
    };

    setImageDetails = (result) => {
        this.setState({
            imageData: result
        });
        Object.keys(this.state.imageData.map((key, id) => {
                this.state.imageDataList.push(key.image);
                this.state.typeList.push(key.type);

            }
        ));
        this.setState({
            imageDataList: this.state.imageDataList,
            typeList: this.state.typeList
        });
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
        let index = 0;
        this.state.userNameList.map((key, id) => {
            if (key === this.props.userName) {
                index = id;
            }
        });
        if (this.state.passwordList[index] === this.props.password) {
            this.state.firstName = this.state.firstNameList[index];
            this.state.lastName = this.state.lastNameList[index];
        }
        this.setState({
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });
        this.props.dispatch({
            type: 'UPDATE_FIRSTNAME',
            payload: this.state.firstName
        });
        this.props.dispatch({
            type: 'UPDATE_LASTNAME',
            payload: this.state.lastName
        });
    };


    render() {
        const styles =
            {

                media: {
                    height: 0,
                    paddingTop: '56.25%',
                    marginTop:'30'
                }
            };
        const content = (content) => {
            if(content==="patioDesign")
                return ("Patio Designs");
            else if(content==="kidsRoomDesign")
                return ("Kids Room Designs");
            else if(content==="livingRoomDesign")
                return ("Living Room Designs");
            else if(content==="kitchenDesign")
                return ("Kitchen Designs");
            else if(content==="kitchenGardenDesign")
                return ("Kitchen Garden Designs");
            else if(content==="bedroomDesign")
                return ("Bedroom Designs");
            else if(content==="DIY")
                return ("Do It Yourself(DIY)");
        };
        return (
            <div className="main-container">
                <HeaderUser/>
                <form className="container">
                    <div className='card-list'>
                        <CardDeck>
                            {this.state.imageDataList.map((tile, id) => (
                                    <Card  style={{display:'grid', height: '25%', width: '25%'}}>
                                        <CardMedia
                                            className="media"
                                            image={tile}
                                            title="Contemplative Reptile"
                                            style={styles.media}/>
                                        <CardContent>
                                            <Typography><Link to={`/${this.state.typeList[id]}`}>{content(this.state.typeList[id])}</Link></Typography>
                                        </CardContent>
                                    </Card>
                                )
                            )}
                        </CardDeck>
                    </div>

                </form>
                <div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userName: state.userName,
        password: state.password,
    };
}

export default withRouter(connect(mapStateToProps)(HomeScreen));

