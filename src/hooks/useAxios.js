import {  useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { useAuth } from "./useAuth";
import axios from "axios";

const useAxios=()=>{
    const{auth,setAuth}=useAuth()
 useEffect(()=>{
   // Add a request interceptor
  
  const requestIntercept= axiosInstance.interceptors.request.use((config)=>{
    const authToken=auth?.authToken
     if(authToken){
        config.headers.Authorization=`Bearer ${authToken}`
     }
     return config;
         
   },(error)=>{
     return Promise.reject(error)
   })


   const responseIntercept= axiosInstance.interceptors.response.use((response)=>{
      return response
    },async(error)=>{
                      const originalRequest=error.config;
        if(error.response.status===401 && !originalRequest._retry){
            originalRequest._retry=true;
         
            // eslint-disable-next-line no-useless-catch
            try {
                const refreshToken=auth?.refreshToken;
                const response= await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,{refreshToken});
                 const {token}=response.data
                 console.log(`New Token:${token}`);
                 setAuth({...auth,authToken:token})

                  // Retry the original request with the new token

                 originalRequest.headers.Authorization=`Bearer ${token}`
                 return axios(originalRequest)
            } catch (error) {
                throw error;
                
            }

        }
        return Promise.reject(error)


     

    })


    return ()=>{
      axiosInstance.interceptors.request.eject(requestIntercept)
      axiosInstance.interceptors.response.eject(responseIntercept)
    }

 },[auth.authToken])

  return {axiosInstance}
}

export default useAxios





