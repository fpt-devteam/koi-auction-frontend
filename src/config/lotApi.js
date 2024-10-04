import axios from "axios";

const lotApi = axios.create({
    baseURL: 'http://localhost:3002/api/auction-service/',
});

export default lotApi;
