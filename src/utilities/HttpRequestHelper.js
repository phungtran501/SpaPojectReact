import axios from "axios";

const HttpRequestHelper = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://localhost:44309',
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    const get = async (url) => {
        try {
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const post = async (url, data) => {
        try {
            const response = await axiosInstance.post(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const deleteHandler = async(url) => {
        try {
            const response = await axiosInstance.delete(url);
            return response.data;
        } 
        catch (error) {
            throw error;
        }
    }

    return {
        get,
        post,
        delete : deleteHandler
    }
}

export default HttpRequestHelper;