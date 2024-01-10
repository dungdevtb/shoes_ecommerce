/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line prettier/prettier
/* eslint-disable import/no-extraneous-dependencies */
import { take, put, fork } from 'redux-saga/effects';
import { SAVE_INFO_USER } from '../Types';
import { fetchApi } from '../../utils/api';
import { actionSaveInfoUser } from '../actions/auth.action';

export function* fetchUserInfo() {
    while (true) {
        try {
            const res = yield fetchApi('/app/auth/user-info');
            yield put(actionSaveInfoUser(res.data));
        } catch (error) {
            yield put(error);
        }
        yield take(SAVE_INFO_USER);
    }
}

const authSagas = [
    fork(fetchUserInfo),
]

export default authSagas