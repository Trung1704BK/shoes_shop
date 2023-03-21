import axios from "axios";

export const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
});

export const getRequest = async (path) => {
    const response = await httpRequest.get(path);
    return response;
};
