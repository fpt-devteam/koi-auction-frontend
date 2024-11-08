import axios from "axios";
const baseUrl = "http://localhost:3004/api/internal";

const config = {
    baseURL: baseUrl,
    withCredentials: true,
};

const internalPaymentApi = axios.create(config);

internalPaymentApi.defaults.baseURL = baseUrl;

export default internalPaymentApi;
