import {createStore, applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {reducer} from './reducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage: storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
const loggerMiddleware = createLogger();

export const store = createStore(
    persistedReducer,
    compose(applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ))
);

export default store;