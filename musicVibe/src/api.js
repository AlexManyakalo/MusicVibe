import axios from "axios";

const api = axios.create({
  baseURL: "http://37.46.130.29:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt_token");
    }
    return Promise.reject(error);
  },
);

export default api;
