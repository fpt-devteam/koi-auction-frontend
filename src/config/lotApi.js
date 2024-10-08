import axios from "axios";
const baseUrl = "http://localhost:3000/auction-service";

const lotApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default lotApi;
