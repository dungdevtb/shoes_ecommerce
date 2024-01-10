/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import axiosInstance from "./axiosInstance";
import { encrypted } from "./encryp_aes";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:8080";

const renderHeaderCheckSum = async () => {
    const time_stamp = Date.now().toString();
    const result = await encrypted(time_stamp);
    return result
}

// eslint-disable-next-line no-unused-vars
export const fetchApi = async (url, method = "get", body, headers) => {
    try {
        const { timestamp, checksum } = await renderHeaderCheckSum()
        let opts = {
            method,
            url: `${API_URL.trim()}${url}`,
            timeout: 1 * 1000 * 60, // 1phut     
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                timestamp,
                checksum
            }
        }

        if (headers) {
            opts = {
                ...opts,
                headers: {
                    ...headers,
                    [headers.key]: headers.value
                }
            }
        }

        if (method === 'get') {
            opts.params = body;
        } else {
            opts.data = body;
        }

        // eslint-disable-next-line prefer-const
        let fetchdata = await axiosInstance(opts)
        if (fetchdata.data.code !== 200) {
            return fetchdata.data
        }

        return fetchdata.data

    } catch (error) {
        let { response } = error;
        if (response) {
            return response.data;
        }
        return error;
    }
}
