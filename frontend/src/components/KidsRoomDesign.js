import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Label} from 'reactstrap';
import HeaderPages from './HeaderPages';
import Footer from './Footer';
import {CardDeck} from 'reactstrap';
import {IconButton, Typography, CardContent, CardMedia, Card} from '@material-ui/core';

class KidsRoomDesign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            design: [], firstName: this.props.firstName, lastName: this.props.lastName,
            patioImage:'',patioCount:'',patioLikes:[],patio:[],
            livingRoomImage: '', livingRoomCount: '', livingRoomLikes: [], livingRoom: [],
            bedroomImage: '', bedroomCount: '', bedroomLikes: [], bedroom: [],
            kitchenImage: '', kitchenCount: '', kitchenLikes: [], kitchen: [],
            kitchenGardenImage: '', kitchenGardenCount: '', kitchenGardenLikes: [], kitchenGarden: [],
            diyImage: '', diyCount: '', diyLikes: [], diy: [],
            kidsRoom: [{kidsRoomImage: '', kidsRoomCount: 0, kidsRoomLikes: []}],
            file: '', kidsRoomPhoto: '', kidsRoomAllImages: [], kidsRoomImages:[],
            kidsRoomCount: [], kidsRoomAllCount: [], kidsRoomLikes: [], kidsRoomAllLikes: []
        }
    }

    //onChange common method for input elements
    onChange = (e) => {
        this.props.dispatch({
            type: 'ONCHANGE',
            key: e.target.name,
            payload: e.target.value
        });

    };

    //componentDidMount method to load data before view is rendered
    componentWillMount() {
        //get for design
        fetch('https://designandsharebackend.herokuapp.com/design/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        }).then(response => response.json())
            .then(result => this.setDesignDetails(result))
            .catch(error => console.log(error));
    };

    //set all details of patio images in state and other image details
    setDesignDetails = (result) => {
        this.state.design = result;
        this.setState({
            design: this.state.design
        });
        let count=0;
        this.state.design.map((val, id) => {
            if (val.kidsRoom != null) {

                if (val.userName === this.props.userName) {
                    count=1;
                    val.kidsRoom.map((design, id) => {
                        if (design.kidsRoomImage !== null && design.kidsRoomImage !== undefined) {
                            this.state.kidsRoomImages.push(design.kidsRoomImage);
                            if (id === 0) {
                                this.state.kidsRoom[0].kidsRoomImage = design.kidsRoomImage;
                            }
                        }
                        if (design.kidsRoomCount !== null && design.kidsRoomCount !== undefined) {
                            this.state.kidsRoomCount.push(design.kidsRoomCount);
                            if (id === 0) {
                                this.state.kidsRoom[0].kidsRoomCount = design.kidsRoomCount;
                            }
                        }
                        if (design.kidsRoomLikes !== null && design.kidsRoomLikes !== undefined) {
                            this.state.kidsRoomLikes.push(design.kidsRoomLikes);
                            if (id === 0) {
                                this.state.kidsRoom[0].kidsRoomLikes = design.kidsRoomLikes;
                            }
                        }
                        if (id > 0) {
                            this.state.kidsRoom = [...this.state.kidsRoom, design];
                        }
                    })
                }
                val.kidsRoom.map((design, id) => {
                    if (design !== null && design !== undefined) {
                        this.state.kidsRoomAllImages.push(design.kidsRoomImage);
                        this.state.kidsRoomAllCount.push(design.kidsRoomCount);
                        this.state.kidsRoomAllLikes.push(design.kidsRoomLikes);
                    }
                });
            }
        });
        if (this.state.kidsRoom[0].kidsRoomImage==="") {

            this.state.kidsRoom.splice(0, 1);

        }
        console.log(this.state.kidsRoom);
        console.log(this.state.kidsRoomAllLikes);
        this.setState({
            kidsRoomAllLikes: this.state.kidsRoomAllLikes,
            kidsRoomAllCount: this.state.kidsRoomAllCount,
            kidsRoomAllImages: this.state.kidsRoomAllImages,
            kidsRoomImages: this.state.kidsRoomImages,
            kidsRoomCount: this.state.kidsRoomCount,
            kidsRoomLikes: this.state.kidsRoomLikes,
            kidsRoom: this.state.kidsRoom,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        const data = {};
        data["userName"] = this.props.userName + "";
        data["password"] = this.props.password + "";
        data["firstName"] = this.props.firstName + "";
        data["lastName"] = this.props.lastName + "";
        this.state.kidsRoom = [...this.state.kidsRoom, {kidsRoomImage: this.state.kidsRoomPhoto,
            kidsRoomCount: 0, kidsRoomLikes: []}];
        this.setState({kidsRoom: this.state.kidsRoom});
        const bedroom = [];
        const patio=[];
        const kidsRoom = [];
        const livingRoom = [];
        const kitchen = [];
        const kitchenGarden = [];
        const diy = [];
        this.state.kidsRoom.map((design, id) => {
            const data1 = {};
            if (id !== this.state.kidsRoom.length) {
                data1["kidsRoomImage"] = design.kidsRoomImage + "";
            }
            if (id !== this.state.kidsRoom.length && design.kidsRoomCount !== undefined) {
                data1["kidsRoomCount"] = design.kidsRoomCount + "";
            }
            if (id !== this.state.kidsRoom.length && design.kidsRoomLikes !== undefined) {
                data1["kidsRoomLikes"] = design.kidsRoomLikes;
            }
            kidsRoom.push(data1);
        });

        this.state.design.map((val, idx) => {
            if(idx!==this.state.design) {
                if (val.userName === this.props.userName) {
                    val.patio.map((design, id) => {
                        const data1 = {};
                        if (id !== val.patio.length) {
                            data1["patioImage"] = design.patioImage + "";
                            data1["patioCount"] = design.patioCount + "";
                            data1["patioLikes"] = design.patioLikes;
                        }
                        patio.push(data1);
                    });
                    val.livingRoom.map((design, id) => {
                        const data1 = {};
                        if (id !== val.livingRoom.length) {
                            data1["livingRoomImage"] = design.livingRoomImage + "";
                            data1["livingRoomCount"] = design.livingRoomCount + "";
                            data1["livingRoomLikes"] = design.livingRoomLikes;
                        }
                        livingRoom.push(data1);
                    });
                    val.bedroom.map((design, id) => {
                        const data1 = {};
                        if (id !== val.bedroom.length) {
                            data1["bedroomImage"] = design.bedroomImage + "";
                            data1["bedroomCount"] = design.bedroomCount + "";
                            data1["bedroomLikes"] = design.bedroomLikes;
                        }
                        bedroom.push(data1);
                    });
                    val.kitchen.map((design, id) => {
                        const data1 = {};
                        if (id !== val.kitchen.length) {
                            data1["kitchenImage"] = design.kitchenImage + "";
                            data1["kitchenCount"] = design.kitchenCount + "";
                            data1["kitchenLikes"] = design.kitchenLikes;
                        }
                        kitchen.push(data1);
                    });
                    val.kitchenGarden.map((design, id) => {
                        const data1 = {};
                        if (id !== val.kitchenGarden.length) {
                            data1["kitchenGardenImage"] = design.kitchenGardenImage + "";
                            data1["kitchenGardenCount"] = design.kitchenGardenCount + "";
                            data1["kitchenGardenLikes"] = design.kitchenGardenLikes;
                        }
                        kitchenGarden.push(data1);
                    });
                    val.diy.map((design, id) => {
                        const data1 = {};
                        if (id !== val.diy.length) {
                            data1["diyImage"] = design.diyImage + "";
                            data1["diyCount"] = design.diyCount + "";
                            data1["diyLikes"] = design.diyLikes;
                        }
                        diy.push(data1);
                    });
                }
            }


        });

        data["patio"]=patio;
        data["bedroom"] = bedroom;
        data["kidsRoom"] = kidsRoom;
        data["livingRoom"] = livingRoom;
        data["kitchen"] = kitchen;
        data["kitchenGarden"] = kitchenGarden;
        data["diy"] = diy;
        console.log(JSON.stringify(data, null, 4));
        fetch('https://designandsharebackend.herokuapp.com/design/', {
            body: JSON.stringify(data),
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

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.state.file = file;
            this.state.kidsRoomPhoto = reader.result;
            this.state.kidsRoomImages.push(this.state.kidsRoomPhoto);
            this.setState({
                file: this.state.file,
                kidsRoomPhoto: this.state.kidsRoomPhoto,
                kidsRoomImages: this.state.kidsRoomImages,
            });
        };

        reader.readAsDataURL(file);
    }

    //setLoginDetails
    handleCount = (idx) => (evt) => {
        if (this.state.kidsRoomAllLikes[idx].includes(this.props.userName)) {
            this.state.kidsRoomAllCount[idx] = parseInt(this.state.kidsRoomAllCount[idx]) - 1;
            let index = this.state.kidsRoomAllLikes[idx].indexOf(this.props.userName);
            this.state.kidsRoomAllLikes[idx].splice(index, 1);
            this.setState({
                kidsRoomAllCount: this.state.kidsRoomAllCount,
                kidsRoomAllLikes: this.state.kidsRoomAllLikes,
            });

        }
        else {
            this.state.kidsRoomAllCount[idx] = parseInt(this.state.kidsRoomAllCount[idx]) + 1;
            this.state.kidsRoomAllLikes[idx].push(this.props.userName);
            this.setState({
                kidsRoomAllCount: this.state.kidsRoomAllCount,
                kidsRoomAllLikes: this.state.kidsRoomAllLikes,
            });
            console.log(this.state.kidsRoomAllCount[idx]);
            console.log(this.state.kidsRoomAllLikes[idx]);
        }

        let index=0;
        this.state.design.map((val, id) => {

            if (id !== this.state.design.length) {
                const patio = [];
                const bedroom=[];
                const kidsRoom = [];
                const livingRoom = [];
                const kitchen = [];
                const kitchenGarden = [];
                const diy = [];
                const data = {};

                val.kidsRoom.map((design, idx) => {
                    const data1 = {};
                    if (idx !== val.kidsRoom.length) {
                        data1["kidsRoomImage"] = design.kidsRoomImage + "";
                    }


                    if (idx !== val.kidsRoom.length) {
                        data1["kidsRoomCount"] = this.state.kidsRoomAllCount[index] + "";
                    }


                    if (idx !== val.kidsRoom.length) {
                        data1["kidsRoomLikes"] = this.state.kidsRoomAllLikes[index];
                    }
                    index++;
                    kidsRoom.push(data1);

                });
                val.patio.map((design, idx) => {
                    const data1 = {};
                    if (idx !== val.patio.length) {
                        data1["patioImage"] = design.patioImage + "";
                        data1["patioCount"] =design.patioCount + "";
                        data1["patioLikes"] = design.patioLikes;
                    }
                    patio.push(data1);
                });
                val.livingRoom.map((design, id) => {
                    const data1 = {};
                    if (id !== val.livingRoom.length) {
                        data1["livingRoomImage"] = design.livingRoomImage + "";
                        data1["livingRoomCount"] = design.livingRoomCount + "";
                        data1["livingRoomLikes"] = design.livingRoomLikes;
                    }
                    kidsRoom.push(data1);
                });
                val.bedroom.map((design, id) => {
                    const data1 = {};
                    if (id !== val.bedroom.length) {
                        data1["bedroomImage"] = design.bedroomImage + "";
                        data1["bedroomCount"] = design.bedroomCount + "";
                        data1["bedroomLikes"] = design.bedroomLikes;
                    }
                    bedroom.push(data1);
                });
                val.kitchen.map((design, id) => {
                    const data1 = {};
                    if (id !== val.kitchen.length) {
                        data1["kitchenImage"] = design.kitchenImage + "";
                        data1["kitchenCount"] = design.kitchenCount + "";
                        data1["kitchenLikes"] = design.kitchenLikes;
                    }
                    kitchen.push(data1);
                });
                val.kitchenGarden.map((design, id) => {
                    const data1 = {};
                    if (id !== val.kitchenGarden.length) {
                        data1["kitchenGardenImage"] = design.kitchenGardenImage + "";
                        data1["kitchenGardenCount"] = design.kitchenGardenCount + "";
                        data1["kitchenGardenLikes"] = design.kitchenGardenLikes;
                    }
                    kitchenGarden.push(data1);
                });
                val.diy.map((design, id) => {
                    const data1 = {};
                    if (id !== val.diy.length) {
                        data1["diyImage"] = design.diyImage + "";
                        data1["diyCount"] = design.diyCount + "";
                        data1["diyLikes"] = design.diyLikes;
                    }
                    diy.push(data1);
                });



                data["userName"] = val.userName + "";
                data["password"] = val.password + "";
                data["firstName"] = val.firstName + "";
                data["lastName"] = val.lastName + "";
                data["patio"] = patio;
                data["bedroom"] = bedroom;
                data["kidsRoom"] = kidsRoom;
                data["livingRoom"] = livingRoom;
                data["kitchen"] = kitchen;
                data["kitchenGarden"] = kitchenGarden;
                data["diy"] = diy;
                console.log(JSON.stringify(data, null, 4));

                fetch('https://designandsharebackend.herokuapp.com/design/', {
                    body: JSON.stringify(data),
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
        });


    };

    render() {
        const favourite = (id) => {
            return ((this.state.kidsRoomAllLikes[id].includes(this.props.userName)) ?
                <IconButton onClick={this.handleCount(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="red"/>
                    </svg>
                </IconButton> :
                <IconButton onClick={this.handleCount(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
                    </svg>
                </IconButton>)
        };

        const styles =
            {
                media: {
                    height: 0,
                    paddingTop: '56.25%',
                    marginTop: '30'
                }
            };

        let {kidsRoomPhoto} = this.state;
        let $imagePreview = null;
        if (kidsRoomPhoto) {
            $imagePreview = (<img className="img-design" src={kidsRoomPhoto}/>);
        } else {
            $imagePreview = (<div className="previewText">Please select kids room design</div>);
        }
        return (
            <div className="main-container">
                <HeaderPages/>
                <form className="container">
                    <div className="previewComponent">
                        <input className="fileInput"
                               type="file" style={{marginLeft: '39%',width:'22%'}}
                               onChange={(e) => this.handleImageChange(e)}/>

                        <div className="imgDesignPreview" style={{marginLeft: '39%',width:'22%'}}>
                            {$imagePreview}
                        </div>
                        <button className="submitButton"
                                type="submit"
                                style={{marginLeft: '46%'}} onClick={(e) => this.handleSubmit(e)}>Save Image
                        </button>
                    </div>
                    <div className='card-list'>
                        <Label htmlFor="isbn" style={{marginLeft:'16%',fontStyle: 'oblique', fontSize: '12px'}}>Kids Room Designs</Label>
                        <CardDeck style={{marginLeft:'16%',marginRight:'16%'}}>
                            {this.state.kidsRoomAllImages.map((tile, id) => (
                                    <Card style={{display: 'grid', height: '33.33%', width: '33.33%'}}>
                                        <CardMedia
                                            className="media"
                                            image={tile}
                                            title="Patio Images"
                                            style={styles.media}/>
                                        <CardContent>
                                            <Typography style={{fontSize:'10px'}}>
                                                {favourite(id)}
                                                {this.state.kidsRoomAllCount[id] + " likes " + this.state.kidsRoomAllLikes[id]}
                                            </Typography>
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
        firstName: state.firstName,
        lastName: state.lastName

    };
}

export default withRouter(connect(mapStateToProps)(KidsRoomDesign));

