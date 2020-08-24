import Axios from "axios";

export const interceptor = () => {
    Axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      console.log('intercept : ', config);
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};
