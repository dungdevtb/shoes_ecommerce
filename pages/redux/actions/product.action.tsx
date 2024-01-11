/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/prefer-default-export */
import { fetchApi } from "../../utils/api";
import { SAVE_LIST_PRODUCT } from "../Types";
import { message } from "antd";

export const actionGetListProduct = async (payload: any, dispatch: any) => {
    try {
        const response = await fetchApi('/api/product/get-list-product-web', 'get', payload);

        if (response.statusCode !== 200) {
            return response?.message || 'ERORR';
        }
        // const token = response?.data?.token || null;
        // localStorage.setItem('token', token);

        await dispatch(actionSaveListProduct(response?.data));
        return response?.data;
    } catch (error) {
        alert(error);
    }
};

export const actionSaveListProduct = (payload: any) => ({
    type: SAVE_LIST_PRODUCT,
    payload,
});
