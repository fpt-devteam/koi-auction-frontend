import axios from "axios";
const baseUrl = "http://localhost:3000/auction-service/sold-lots/";

const soldLotApi = axios.create({
    baseURL: baseUrl,
});
export default soldLotApi;