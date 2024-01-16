/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/prefer-default-export */
import { fetchApi, fetchApiToken } from "../../utils/api";
import { SAVE_INFO_USER } from "../Types";
// import { message } from "antd";

export const actionLogin = async (payload: any, dispatch: any) => {
    try {
        const response = await fetchApiToken('/api/customer/login', 'post', payload);

        if (response.statusCode !== 200) {
            return response?.message || 'ERORR';
        }
        const token = response?.data?.token || null;
        localStorage.setItem('token', token);

        dispatch(actionSaveInfoUser(response?.data?.user))

        return response?.data?.user;
    } catch (error) {
        alert(error);
    }
};

export const actionSaveInfoUser = (payload: any) => ({
    type: SAVE_INFO_USER,
    payload,
});

export const actionLogout = () => async () => {
    try {
        localStorage.removeItem('token')
        window.location.assign('/login')
        return;
    } catch (error) {
        alert(error)
    }
}
