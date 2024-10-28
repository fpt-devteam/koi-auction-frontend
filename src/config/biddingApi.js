import axios from "axios";
const baseUrl = "http://localhost:3000/bidding-service";

const lotApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default lotApi;
