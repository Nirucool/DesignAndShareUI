import React, { Component } from 'react';
import { connect} from 'react-redux';
import store from './store';
import {withRouter} from 'react-router-dom';
import LoginScreen from "./components/LoginScreen";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
                <div>
                    <LoginScreen store={store}/>
                </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        state
    };
}

export default  withRouter(connect(mapStateToProps)(App));