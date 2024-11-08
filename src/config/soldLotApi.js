import axios from "axios";
const baseUrl = "http://localhost:3002/api/sold-lots/";

const soldLotApi = axios.create({
    baseURL: baseUrl,
});
export default soldLotApi;