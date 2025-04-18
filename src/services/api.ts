import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; 

export interface Brand {
  id: number;
  name: string;
  logo: string;
}

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

export const updateBrand = async (
  id: number,
  data: FormData
): Promise<Brand> => {
  const response = await api.put(
    `manage_brand/${id}/`,
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );
  return response.data;
};

export const deleteBrand = async (id: number) => {
  const response = await api.delete(`manage_brand/${id}/`);
  return response.data;
};

export default api;
