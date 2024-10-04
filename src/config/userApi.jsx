import axios from "axios";
const baseUrl = "http://localhost:3000";

const config = {
  baseURL: baseUrl,
  withCredentials: true
};

const userApi = axios.create(config);

userApi.defaults.baseURL = baseUrl;

export default userApi;
