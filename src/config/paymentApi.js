import axios from "axios";
const baseUrl = "https://b6fa-2001-ee0-1b0a-ace4-7096-3dd3-148b-e55e.ngrok-free.app/payment-service";

const config = {
  baseURL: baseUrl,
  withCredentials: true,
};

const paymentApi = axios.create(config);

paymentApi.defaults.baseURL = baseUrl;

export default paymentApi;
