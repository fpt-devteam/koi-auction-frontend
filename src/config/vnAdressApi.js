import axios from "axios";
const baseUrl = "https://vapi.vnappmob.com";

const vnAdressApi = axios.create({
    baseURL: baseUrl,
});

export default vnAdressApi;
