import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 1000,
  headers: { 
    'Content-Type': 'application/json' }
});


axiosInstance.interceptors.request.use(
    function (config) {
      const token=localStorage.getItem('token');
       if (token&&config.headers) {
            config.headers={
              Accept: 'application/json',
              Authorization : `Bearer ${JSON.parse(token)}`
            }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

export default axiosInstance
