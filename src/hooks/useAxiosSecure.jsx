import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../provider/AuthContext';



const axiosInstance = axios.create({


  baseURL: 'http://localhost:5000'
})



const useAxiosSecure = () => {

  const { user } = use(AuthContext)
  axiosInstance.interceptors.request.use(config => {
  
 

    config.headers.authorization = `Bearer ${user.accessToken}`
    return config
  })

  return axiosInstance;
};

export default useAxiosSecure;