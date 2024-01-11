/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/prefer-default-export */
import { fetchApi } from "../../utils/api";
import { SAVE_INFO_USER } from "../Types";
// import { message } from "antd";

export const actionLogin = async (payload: any) => {
    try {
        const response = await fetchApi('/api/customer/login', 'post', payload);

        if (response.code !== 200) {
            return response?.message || 'ERORR';
        }
        const token = response?.data?.token || null;
        localStorage.setItem('token', token);

        return response?.data?.user;
    } catch (error) {
        alert(error);
    }
};

export const actionSaveInfoUser = (payload: any) => ({
    type: SAVE_INFO_USER,
    payload,
});
