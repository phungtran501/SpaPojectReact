import axios from "axios";

const baseURL = 'https://localhost:44309';

const HttpRequestHelper = () => {
    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    const axiosFile = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'multipart/form-data',
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

    const postWithFile = async (url, data) => {
        try {
            const response = await axios.post(`${baseURL}${url}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
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
        baseURL,
        get,
        post,
        delete : deleteHandler,
        postWithFile,
    }
}

export default HttpRequestHelper;