import axios from "axios";
const baseUrl = "http://localhost:3000/user-service/address/";

const addressApi = axios.create({
  baseURL: baseUrl,
});
export default addressApi;