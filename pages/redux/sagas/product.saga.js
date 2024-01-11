/* eslint-disable prettier/prettier */

import { take, put, fork } from 'redux-saga/effects';
// eslint-disable-next-line import/no-useless-path-segments
import { SAVE_LIST_PRODUCT } from "../../redux/Types";
import { actionSaveListProduct } from '../actions/product.action.tsx';
import api from '../ApiUrlForBE'

/**
 * userList saga
 */
export function* fetchProductList() {
    while (true) {

        try {
            const res = yield fetch(api.getListProduct);
            const data = yield res.json();
            yield put(actionSaveListProduct(data.data));
        } catch (e) {
            yield put(e);
        }
        yield take(SAVE_LIST_PRODUCT);
    }
}
// export function* fetchCategoryProductList() {
//   while (true) {
//     try {
//       const res = yield fetch(api.getListCategory);
//       const data = yield res.json();
//       yield put(loadListCategory(data.data));
//     } catch (e) {
//       yield put(e);
//     }
//     yield take(LOAD_CATEGORY_PRODUCT);
//   }
// }

const productSagas = [
    fork(fetchProductList)
    //   fork(fetchCategoryProductList),
];


export default productSagas;