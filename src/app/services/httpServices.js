import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logServices";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(res => res, function (error) {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
        logger.log(error);
        // toast("Сервер недоступен, попробуйте позже");
        // toast.error("Сервер недоступен, попробуйте позже");
        toast.info("Сервер недоступен, попробуйте позже");
        console.log("Unexpected error");
    }
    return Promise.reject(error);
})

const httpServices = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpServices;