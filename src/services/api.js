import axios from "axios";

const API_URL = "https://cs9-backend-kiara.vercel.app/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Items API
export const itemsApi = {
  getAll: () => api.get("/item"),
  getById: (id) => api.get(`/item/byId/${id}`),
  getByStoreId: (storeId) => api.get(`/item/byStoreId/${storeId}`),
  create: (formData) => api.post("/item/create", formData),
  update: (formData) => api.put("/item", formData),
  delete: (id) => api.delete(`/item/${id}`),
};

// Stores API
export const storesApi = {
  getAll: () => api.get("/store/getAll"),
  getById: (id) => api.get(`/store/${id}`),
  create: (data) => api.post("/store/create", data),
  update: (data) => api.put("/store", data),
};

// Users API
export const usersApi = {
  register: (data) => api.post("/user/register", data),
  login: (data) => api.post("/user/login", data),
  getByEmail: (email) => api.get(`/user/${email}`),
  update: (data) => api.put("/user", data),
  delete: (id) => api.delete(`/user/${id}`),
  topUp: (id, amount) =>
    api.post("/user/topUp", null, { params: { id, amount } }),
};

// Transactions API
export const transactionsApi = {
  getAll: () => api.get("/transaction"),
  create: (data) => api.post("/transaction/create", data),
  pay: (id) => api.post(`/transaction/pay/${id}`),
  delete: (id) => api.delete(`/transaction/${id}`),
};

export default api;
