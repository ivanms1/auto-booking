import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
let token = cookies.get('accessToken') as string;

export interface RequestConfig extends AxiosRequestConfig {
  ignoreGlobalCatch?: boolean;
}

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
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
