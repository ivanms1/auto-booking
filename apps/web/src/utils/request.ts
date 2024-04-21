import axios, { AxiosRequestConfig } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  ignoreGlobalCatch?: boolean;
}

export const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
