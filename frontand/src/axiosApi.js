import axios from 'axios';
import {apiUrl} from "./apiUrl";

const axiosApi = axios.create({
    baseURL: apiUrl
});


export default axiosApi;