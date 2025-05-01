import axios from "axios";
import { handleApiError } from "../utils/apiUtils";

// Use environment variables with fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor - adds auth token if available
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser?.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handles common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const processedError = handleApiError(error);
    console.error("API Error:", processedError);
    return Promise.reject(processedError);
  }
);

// Special instance for file uploads
export const uploadApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 30000, // 30 seconds for uploads
});

// Apply the same interceptors to the upload instance
uploadApi.interceptors.request.use(
  api.interceptors.request.handlers[0].fulfilled,
  api.interceptors.request.handlers[0].rejected
);

uploadApi.interceptors.response.use(
  api.interceptors.response.handlers[0].fulfilled,
  api.interceptors.response.handlers[0].rejected
);

// Items API
export const itemsApi = {
  getAll: () => api.get("/item"),
  getById: (id) => api.get(`/item/byId/${id}`),
  getByStoreId: (storeId) => api.get(`/item/byStoreId/${storeId}`),
  create: (formData) => uploadApi.post("/item/create", formData),
  update: (formData) => uploadApi.put("/item", formData),
  delete: (id) => api.delete(`/item/${id}`),
};

// Stores API
export const storesApi = {
  getAll: () => api.get("/store/getAll"),
  getById: (id) => api.get(`/store/${id}`),
  create: (data) => api.post("/store/create", data),
  update: (data) => api.put("/store", data),
  delete: (id) => api.delete(`/store/${id}`),
};

// Users API
export const usersApi = {
  register: (data) => api.post("/user/register", data),
  login: (data) => api.post("/user/login", data),
  getByEmail: (email) => api.get(`/user/${email}`),
  update: (data) => api.put("/user", data),
  delete: (id) => api.delete(`/user/${id}`),
  topUp: (data) => api.post("/user/topUp", data),
};

// Transactions API
export const transactionsApi = {
  getAll: () => api.get("/transaction"),
  create: (data) => api.post("/transaction/create", data),
  pay: (id) => api.post(`/transaction/pay/${id}`),
  delete: (id) => api.delete(`/transaction/${id}`),
};

export default api;
