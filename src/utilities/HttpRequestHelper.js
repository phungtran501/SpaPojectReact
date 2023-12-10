import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const baseURL = "https://localhost:44309";

const HttpRequestHelper = () => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const token = localStorage.getItem("token");

  axiosInstance.interceptors.request.use(
    function (config) {
      config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

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
        Authorization: `Bearer ${token}`,
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
