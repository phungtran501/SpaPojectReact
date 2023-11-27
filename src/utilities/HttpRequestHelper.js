import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = "https://localhost:44309";

const HttpRequestHelper = () => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const axiosFile = axios.create({
    baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const get = async (url) => {
    const response = await axiosInstance.get(url);
    return response.data;
  };

  const post = async (url, data) => {
    const response = await axiosInstance.post(url, data);
    return response.data;
  };

  const postWithFile = async (url, data) => {
    const response = await axios.post(`${baseURL}${url}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  const deleteHandler = async (url) => {
    const response = await axiosInstance.delete(url);
    return response.data;
  };

  return {
    baseURL,
    get,
    post,
    delete: deleteHandler,
    postWithFile,
  };
};

export default HttpRequestHelper;
