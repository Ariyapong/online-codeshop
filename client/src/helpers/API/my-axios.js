import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.REACT_APP_URL_ENDPOINT,
})
// const myAxios = Axios.create();
axios.interceptors.request.use(function (config) {
    // let token = window.sessionStorage.getItem('ClientToken');
    // if(token) {
    //     // console.log('intercept : have token !', token);
    //     // Axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    //     config.headers.Authorization  = `Bearer ${token}`; 
    // }
    // something
    // console.log('intercept : ', config);

    return config;
  }, function (error) {
    // if request error
    return Promise.reject(error);
  });


export default axios;