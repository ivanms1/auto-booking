import { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { request } from './request';

export const fetchResponseToServiceData = <T>(
  res: AxiosResponse,
  model: string
): T => {
  return res.data?.[model] as T;
};

export const serviceFetch = async <T>(
  options: AxiosRequestConfig,
  model?: string
): Promise<T> => {
  const res = await request(options);
  if (!model) {
    return res.data as T;
  }
  return fetchResponseToServiceData<T>(res, model);
};
