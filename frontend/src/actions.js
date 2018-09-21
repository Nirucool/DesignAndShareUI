import {history} from './history';

export const userActions = {

    updateProfile,loginRequest

};

function loginRequest(state) {
    return dispatch => {
        dispatch(request({state}));
        history.push('/home');
    };

    function request(state) {
        return {type: 'LOGIN_REQUEST', payload: {result: state}}
    }
}
function updateProfile(state) {
    return dispatch => {
        dispatch(request({state}));
        //history.push('/profile');
    };

    function request(state) {
        return {type: 'UPDATE_PROFILE', payload: {result: state}}
    }
}

