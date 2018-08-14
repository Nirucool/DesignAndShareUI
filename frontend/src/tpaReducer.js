export function tpaReducer(state = {tpaDropDown:'',tpaName:'',
    tpaAcronym: '',
    tpaLine1: '',
    tpaLine2: '',
    tpaCity: '',
    tpaZip: '',
    tpaCountryCode: '',
    tpaAreaCode: '',
    tpaDailNumber: '',
    tpaPhoneExt: '',}, action) {

    switch (action.type) {
        case 'UPDATE_TPADROPDOWN':
        {
            const tpaDropDown = action.payload;
            return {
                ...state,
                tpaDropDown
            };
        }
        case 'TPA_ONCHANGE': {
            return {
            ...state,
                [action.key]:action.payload
        };
        }

        default:
            return state
    }
}