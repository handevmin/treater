import axios from 'axios';

const apiBaseUrl = 'https://treator-d388c37e5c9e.herokuapp.com/'; // Your API base URL

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
  // You can add more default configurations here, such as headers, timeouts, etc.
});

// Optional: You can add interceptors to handle request/response globally.
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("interceptors.request : ");
    console.log(config);
    // You can modify the request config here, such as adding authentication tokens, etc.
    return config;
  },
  (error) => {
    // Handle request errors here.
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // You can handle successful responses here.
    console.log("interceptors.response : ");
    console.log(response);
    return response;
  },
  (error) => {
    // Handle response errors here.
    return Promise.reject(error);
  }
);

export default axiosInstance;