
 export function reducer(state = {userName: '', password:'',firstName:'',lastName:'',profilePhoto:''}, action) {

    switch (action.type) {

        case 'LINK_CLICK': {
            return Object.assign({}, state, {
                auth: action.payload
            });
        }
        case 'UPDATE_FIRSTNAME':
        {
            const firstName=action.payload;
            return {
                ...state,
                firstName
            };
        }
        case 'UPDATE_LASTNAME':
        {
            const lastName=action.payload;
            return {
                ...state,
                lastName
            };
        }
        case 'UPDATE_PHOTO':
        {
            const profilePhoto=action.payload;
            return {
                ...state,
                profilePhoto
            };
        }

        case 'ONCHANGE': {
            return {
                ...state,
                [action.key]:action.payload
            };
        }
        case 'LOGIN_REQUEST':
            return Object.assign({}, state, {
                auth: action.payload
            });
        case 'UPDATE_PROFILE':
            return Object.assign({}, state, {
                auth: action.payload
            });
        default:
            return state
    }
}