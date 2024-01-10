/* eslint-disable prettier/prettier */
/* eslint-disable default-param-last */
import { SAVE_INFO_USER } from "../Types";

const initialState = {
    infoUser: null,
    // token: null,
    // listUserLoginPermission: [],
    // showLogin: 0,
    // sendPassword: {},
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_INFO_USER:
            return {
                ...state,
                infoUser: action.payload
            }
        default:
            return state
    }
}

export default homeReducer