import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(res => res, function (error) {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
        logger.log(error);
        toast.error("Сервер недоступен, попробуйте позже");
        console.log("Unexpected error");
    }
    return Promise.reject(error);
})

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;