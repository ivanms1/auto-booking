import axios, { AxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
let token = cookies.get('accessToken');

export interface RequestConfig extends AxiosRequestConfig {
  ignoreGlobalCatch?: boolean;
}

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

request.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function setToken(newToken: string) {
  token = newToken;
}
