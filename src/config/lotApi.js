import axios from "axios";
const baseUrl = "https://b6fa-2001-ee0-1b0a-ace4-7096-3dd3-148b-e55e.ngrok-free.app/auction-service";

const lotApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default lotApi;
