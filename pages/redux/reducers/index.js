/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import auth from './auth.reducer';

const _reducers = combineReducers({
    auth
})

function reducers(state, action) {
    if (action.type === HYDRATE) {
        return { ...state, ...action.payload };
    }
    return _reducers(state, action);
}

export default reducers;

