import axios from "axios";
import logger from "./logServices";

axios.interceptors.response.use(res => res, function (error) {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
        logger.log(error);
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