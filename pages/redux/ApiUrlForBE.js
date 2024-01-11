/* eslint-disable prettier/prettier */
/* eslint-disable import/no-anonymous-default-export */
// const API url
const API_URL = process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:8080";

export default {
    /**
     * Get user list
     * @method GET
     */
    getListProduct: `${API_URL}/api/product/get-list-product-web`,
};