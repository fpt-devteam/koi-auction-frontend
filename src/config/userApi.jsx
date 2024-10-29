import axios from "axios";
const baseUrl = "http://localhost:3000/user-service";

const userApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default userApi;
