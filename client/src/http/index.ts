import axios, { AxiosRequestConfig } from 'axios';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
  withCredentials: true, // Cookie будут цепляться автоматически
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  if (config && config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return config;
});

export { $api };