import axios from "axios";
const baseUrl = "http://localhost:3000/payment-service";

const config = {
  baseURL: baseUrl,
  withCredentials: true,
};

const paymentApi = axios.create(config);

paymentApi.defaults.baseURL = baseUrl;

export default paymentApi;
