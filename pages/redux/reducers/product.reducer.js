/* eslint-disable prettier/prettier */
/* eslint-disable default-param-last */
import { SAVE_LIST_PRODUCT } from "../Types";

const initialState = {
    listProduct: null,
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_LIST_PRODUCT:
            return {
                ...state,
                listProduct: action.payload
            }
        default:
            return state
    }
}

export default productReducer