import * as request from "../util/httpRequest";

export const getCategory = async () => {
    const response = await request.getRequest("category/get/");
    return response.data;
};

export const getCategoryClient = async () => {
    const response = await request.getRequest("category/categoryClient/");
    return response.data;
};
