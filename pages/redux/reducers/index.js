/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import auth from './auth.reducer';
import product from './product.reducer';

const _reducers = combineReducers({
    auth,
    product
})

function reducers(state, action) {
    if (action.type === HYDRATE) {
        return { ...state, ...action.payload };
    }
    return _reducers(state, action);
}

export default reducers;

