import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import App from './App';
import './App.css';
import {Provider} from 'react-redux';
import {store} from './store';
import registerServiceWorker from './registerServiceWorker';
import { history } from './history';
import LoginScreen from "./components/LoginScreen";
import RegistrationScreen from "./components/RegistrationScreen";
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import BedroomDesign from "./components/BedroomDesign";
import KitchenDesign from "./components/KitchenDesign";
import KidsRoomDesign from "./components/KidsRoomDesign";
import KitchenGardenDesign from "./components/KitchenGardenDesign";
import LivingRoomDesign from "./components/LivingRoomDesign";
import DIY from "./components/DIY";
import PatioDesign from "./components/PatioDesign";
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistStore} from 'redux-persist';

const persistor = persistStore(store);
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
            <Router history={history}>
                <div>
                    <Route exact path='/' component={() => (<App store={store}/>)}/>
                    <Route path='/login' component={() => (<LoginScreen store={store}/>)}/>
                    <Route path='/profile' component={() => (<ProfileScreen store={store}/>)}/>
                    <Route path='/registration' component={() => (<RegistrationScreen store={store}/>)}/>
                    <Route path='/home' component={() => (<HomeScreen store={store}/>)}/>
                    <Route path='/patioDesign' component={() => (<PatioDesign store={store}/>)}/>
                    <Route path='/DIY' component={() => (<DIY store={store}/>)}/>
                    <Route path='/bedroomDesign' component={() => (<BedroomDesign store={store}/>)}/>
                    <Route path='/kidsRoomDesign' component={() => (<KidsRoomDesign store={store}/>)}/>
                    <Route path='/kitchenDesign' component={() => (<KitchenDesign store={store}/>)}/>
                    <Route path='/kitchenGardenDesign' component={() => (<KitchenGardenDesign store={store}/>)}/>
                    <Route path='/livingRoomDesign' component={() => (<LivingRoomDesign store={store}/>)}/>
                </div>
            </Router>
            </PersistGate>
        </Provider>, document.getElementById('root')
    );


registerServiceWorker();
