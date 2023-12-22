import axios from "axios";
import { getAuthToken } from "./Utils";

axios.defaults.baseURL = "http://localhost:8084/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const applHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};


export function request(method, url, data, headers = {}) {
    if (getAuthToken() !== null && getAuthToken() !== "null" && getAuthToken() !== "undefined") {
        headers["Authorization"] = `Bearer ${getAuthToken()}`;
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    });
};