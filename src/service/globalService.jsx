import axios from "axios";
export const getAddress = async () => {
    const response = await axios.get(
        "https://provinces.open-api.vn/api/?depth=3"
    );
    return response;
};
