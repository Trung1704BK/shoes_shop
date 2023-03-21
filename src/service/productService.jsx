import { httpRequest } from "../util/httpRequest";

export const getNewProduct = async ({ sortBy, orderBy, limit }) => {
    const response = await httpRequest.get(
        `product?limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}`
    );
    return response;
};

export const getOldProduct = async ({ sortBy, orderBy, limit }) => {
    const response = await httpRequest.get(
        `product?limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}`
    );
    return response;
};

export const getProductDetail = async ({ productId }) => {
    const response = await httpRequest.get(`product/${productId}`);
    return response;
};

export const getProductFilter = async ({ productFilterId, limit, offset }) => {
    const response = await httpRequest.post(
        // `product/filter`,
        `product/filter?limit=${limit}&offset=${offset}`,
        productFilterId
    );
    return response;
};

export const getProductFind = async ({ search }) => {
    const response = await httpRequest.get(`product/find?search=${search}`);
    return response;
};
