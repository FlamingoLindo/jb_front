import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export const getBrands = async () => {
  const response = await api.get("get_brand/");
  return response.data;
};

export const getBrand = async (id: number | string) => {
  const response = await api.get(`get_product_by_brand/${id}/`);
  return response.data;
};

export const createBrand = async (data: FormData) => {
  const res = await api.post("create_brand/", data);
  return res.data;
};

export const updateBrand = async (id: number, brandData: Partial<{ name: string; logo: string }>) => {
  const response = await api.put(`manage_brand/${id}/`, brandData);
  return response.data;
};

export const deleteBrand = async (id: number) => {
  const response = await api.delete(`manage_brand/${id}/`);
  return response.data;
};

export default api;
