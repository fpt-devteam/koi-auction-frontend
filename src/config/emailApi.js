import axios from "axios";
const baseUrl = "http://localhost:3005/api/";

const emailApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default emailApi;