import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Label} from 'reactstrap';
import HeaderUser from './HeaderUser';
import HeaderPages from './HeaderPages';
import Footer from './Footer';
import {CardDeck} from 'reactstrap';
import {IconButton, Typography, CardContent, CardMedia, Card} from '@material-ui/core';


class KitchenDesign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            design: [], firstName: this.props.firstName, lastName: this.props.lastName,
            patioImage:'',patioCount:'',patioLikes:[],patio:[],
            kidsRoomImage: '', kidsRoomCount: '', kidsRoomLikes: [], kidsRoom: [],
            bedroomImage: '', bedroomCount: '', bedroomLikes: [], bedroom: [],
            kitchenGardenImage: '', kitchenGardenCount: '', kitchenGardenLikes: [], kitchenGarden: [],
            livingRoomImage: '', livingRoomCount: '', livingRoomLikes: [], livingRoom: [],
            diyImage: '', diyCount: '', diyLikes: [], diy: [],
            kitchen: [{kitchenImage: '', kitchenCount: 0, kitchenLikes: []}],
            file: '', kitchenPhoto: '', kitchenAllImages: [], kitchenImages:[],
            kitchenCount: [], kitchenAllCount: [], kitchenLikes: [], kitchenAllLikes: []
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
            if (val.kitchen != null) {

                if (val.userName === this.props.userName) {
                    count=1;
                    val.kitchen.map((design, id) => {
                        if (design.kitchenImage !== null && design.kitchenImage !== undefined) {
                            this.state.kitchenImages.push(design.kitchenImage);
                            if (id === 0) {
                                this.state.kitchen[0].kitchenImage = design.kitchenImage;
                            }
                        }
                        if (design.kitchenCount !== null && design.kitchenCount !== undefined) {
                            this.state.kitchenCount.push(design.kitchenCount);
                            if (id === 0) {
                                this.state.kitchen[0].kitchenCount = design.kitchenCount;
                            }
                        }
                        if (design.kitchenLikes !== null && design.kitchenLikes !== undefined) {
                            this.state.kitchenLikes.push(design.kitchenLikes);
                            if (id === 0) {
                                this.state.kitchen[0].kitchenLikes = design.kitchenLikes;
                            }
                        }
                        if (id > 0) {
                            this.state.kitchen = [...this.state.kitchen, design];
                        }
                    })
                }
                val.kitchen.map((design, id) => {
                    if (design !== null && design !== undefined) {
                        this.state.kitchenAllImages.push(design.kitchenImage);
                        this.state.kitchenAllCount.push(design.kitchenCount);
                        this.state.kitchenAllLikes.push(design.kitchenLikes);
                    }
                });
            }
        });
        if (this.state.kitchen[0].kitchenImage==="") {

            this.state.kitchen.splice(0, 1);

        }
        console.log(this.state.kitchen);
        console.log(this.state.kitchenAllLikes);
        this.setState({
            kitchenAllLikes: this.state.kitchenAllLikes,
            kitchenAllCount: this.state.kitchenAllCount,
            kitchenAllImages: this.state.kitchenAllImages,
            kitchenImages: this.state.kitchenImages,
            kitchenCount: this.state.kitchenCount,
            kitchenLikes: this.state.kitchenLikes,
            kitchen: this.state.kitchen,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        const data = {};
        data["userName"] = this.props.userName + "";
        data["password"] = this.props.password + "";
        data["firstName"] = this.props.firstName + "";
        data["lastName"] = this.props.lastName + "";
        this.state.kitchen = [...this.state.kitchen, {kitchenImage: this.state.kitchenPhoto,
            kitchenCount: 0, kitchenLikes: []}];
        this.setState({kitchen: this.state.kitchen});
        const bedroom = [];
        const patio=[];
        const kidsRoom = [];
        const livingRoom = [];
        const kitchen = [];
        const kitchenGarden = [];
        const diy = [];
        this.state.kitchen.map((design, id) => {
            const data1 = {};
            if (id !== this.state.kitchen.length) {
                data1["kitchenImage"] = design.kitchenImage + "";
            }
            if (id !== this.state.kitchen.length && design.kitchenCount !== undefined) {
                data1["kitchenCount"] = design.kitchenCount + "";
            }
            if (id !== this.state.kitchen.length && design.kitchenLikes !== undefined) {
                data1["kitchenLikes"] = design.kitchenLikes;
            }
            kitchen.push(data1);
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
                    val.kidsRoom.map((design, id) => {
                        const data1 = {};
                        if (id !== val.kidsRoom.length) {
                            data1["kidsRoomImage"] = design.kidsRoomImage + "";
                            data1["kidsRoomCount"] = design.kidsRoomCount + "";
                            data1["kidsRoomLikes"] = design.kidsRoomLikes;
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
                    val.livingRoom.map((design, id) => {
                        const data1 = {};
                        if (id !== val.livingRoom.length) {
                            data1["livingRoomImage"] = design.livingRoomImage + "";
                            data1["livingRoomCount"] = design.livingRoomCount + "";
                            data1["livingRoomLikes"] = design.livingRoomLikes;
                        }
                        livingRoom.push(data1);
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
            this.state.kitchenPhoto = reader.result;
            this.state.kitchenImages.push(this.state.kitchenPhoto);
            this.setState({
                file: this.state.file,
                kitchenPhoto: this.state.kitchenPhoto,
                kitchenImages: this.state.kitchenImages,
            });
        };

        reader.readAsDataURL(file);
    }

    //setLoginDetails
    handleCount = (idx) => (evt) => {
        if (this.state.kitchenAllLikes[idx].includes(this.props.userName)) {
            this.state.kitchenAllCount[idx] = parseInt(this.state.kitchenAllCount[idx]) - 1;
            let index = this.state.kitchenAllLikes[idx].indexOf(this.props.userName);
            this.state.kitchenAllLikes[idx].splice(index, 1);
            this.setState({
                kitchenAllCount: this.state.kitchenAllCount,
                kitchenAllLikes: this.state.kitchenAllLikes,
            });

        }
        else {
            this.state.kitchenAllCount[idx] = parseInt(this.state.kitchenAllCount[idx]) + 1;
            this.state.kitchenAllLikes[idx].push(this.props.userName);
            this.setState({
                kitchenAllCount: this.state.kitchenAllCount,
                kitchenAllLikes: this.state.kitchenAllLikes,
            });
            console.log(this.state.kitchenAllCount[idx]);
            console.log(this.state.kitchenAllLikes[idx]);
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

                val.kitchen.map((design, idx) => {
                    const data1 = {};
                    if (idx !== val.kitchen.length) {
                        data1["kitchenImage"] = design.kitchenImage + "";
                    }


                    if (idx !== val.kitchen.length) {
                        data1["kitchenCount"] = this.state.kitchenAllCount[index] + "";
                    }


                    if (idx !== val.kitchen.length) {
                        data1["kitchenLikes"] = this.state.kitchenAllLikes[index];
                    }
                    index++;
                    kitchen.push(data1);

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
                val.kidsRoom.map((design, id) => {
                    const data1 = {};
                    if (id !== val.kidsRoom.length) {
                        data1["kidsRoomImage"] = design.kidsRoomImage + "";
                        data1["kidsRoomCount"] = design.kidsRoomCount + "";
                        data1["kidsRoomLikes"] = design.kidsRoomLikes;
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
                val.kitchenGarden.map((design, id) => {
                    const data1 = {};
                    if (id !== val.kitchenGarden.length) {
                        data1["kitchenGardenImage"] = design.kitchenGardenImage + "";
                        data1["kitchenGardenCount"] = design.kitchenGardenCount + "";
                        data1["kitchenGardenLikes"] = design.kitchenGardenLikes;
                    }
                    kitchenGarden.push(data1);
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
            return ((this.state.kitchenAllLikes[id].includes(this.props.userName)) ?
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

        let {kitchenPhoto} = this.state;
        let $imagePreview = null;
        if (kitchenPhoto) {
            $imagePreview = (<img className="img-design" src={kitchenPhoto}/>);
        } else {
            $imagePreview = (<div className="previewText">Please select kitchen design</div>);
        }
        return (
            <div className="main-container">
                <HeaderPages/>
                <form className="container">
                    <div className="previewComponent">
                        <input className="fileInput"
                               type="file" style={{marginLeft: '33.33%'}}
                               onChange={(e) => this.handleImageChange(e)}/>

                        <div className="imgDesignPreview" style={{marginLeft: '33.33%'}}>
                            {$imagePreview}
                        </div>
                        <button className="submitButton"
                                type="submit"
                                style={{marginLeft: '45%'}} onClick={(e) => this.handleSubmit(e)}>Save Image
                        </button>
                    </div>
                    <div className='card-list'>
                        <Label htmlFor="isbn" style={{fontStyle: 'oblique', fontSize: '20px'}}>Kitchen Designs</Label>
                        <CardDeck>
                            {this.state.kitchenAllImages.map((tile, id) => (
                                    <Card style={{display: 'grid', height: '33.33%', width: '33.33%'}}>
                                        <CardMedia
                                            className="media"
                                            image={tile}
                                            title="Patio Images"
                                            style={styles.media}/>
                                        <CardContent>
                                            <Typography>
                                                {favourite(id)}
                                                {this.state.kitchenAllCount[id] + " likes " + this.state.kitchenAllLikes[id]}
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

export default withRouter(connect(mapStateToProps)(KitchenDesign));

