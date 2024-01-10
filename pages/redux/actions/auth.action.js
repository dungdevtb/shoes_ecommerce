/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/prefer-default-export */
import { fetchApi } from "../../utils/api";
import { SAVE_INFO_USER } from "../../redux/Types";
// import { message } from "antd";


export const actionSaveInfoUser = payload => ({
    type: SAVE_INFO_USER,
    payload,
});
