/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import { all } from 'redux-saga/effects';
// import authSagas from './auth.saga';
// import productSagas from './product.saga';

export default function* rootSaga() {
    yield all([
        // ...authSagas,
        // ...productSagas
    ]);
}