import axios from "axios";
const baseUrl = "https://vapi.vnappmob.com/api";

export const addressApi = axios.create({
  baseURL: baseUrl,
});
