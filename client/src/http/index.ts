import axios, { AxiosRequestConfig } from 'axios';
import { AuthResponse } from '../models/response/auth-response';
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

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    // Сделали запрос, получили 401,
    const originalRequest = error.config; // Здесь хранятся все данные для запроса
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      // Если, после второго запроса придет снова 401, то запросы зациклятся, чтобы избежать этого добавим
      // поле, для отслеживания, что запрос уже был
      originalRequest._isRetry = true;
      try {
        // Отправили запрос на получение нового accsessTokena, и теперь...
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        // Надо повторить оригинальный запрос
        return $api.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    // Если не 401, то пробрасываем ошибку наверх
    throw error;
  }
);

export { $api };
