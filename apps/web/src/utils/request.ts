import axios, { AxiosRequestConfig } from 'axios';
import { Cookies } from "react-cookie";  
const cookies = new Cookies();  
const token = cookies.get("accessToken");  

export interface RequestConfig extends AxiosRequestConfig {
  ignoreGlobalCatch?: boolean;
}

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`
  }
});
 