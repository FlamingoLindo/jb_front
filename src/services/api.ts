import axios from "axios";
//import toast from 'react-hot-toast';

import { Brand, Product, User, Paginated } from '@/interfaces';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    if (config.url?.endsWith("login/")) {
      return config;
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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

export const getBrandById = async (id: string): Promise<Brand> => {
  const response = await api.get(`get_brand_by_id/${id}/`);
  return response.data;
};

export const getProductsByBrand = async (
  id: number | string
): Promise<Product[]> => {
  const { data } = await api.get(`/get_product_by_brand/${id}/`);
  return data.products;    // ← only the array
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

export const createProduct = async (data: FormData) => {
  const res = await api.post("create_product/", data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`manage_product/${id}/`);
  return response.data;
};

export const updateProduct = async (id: number, data: FormData): Promise<Product> => {
  const response = await api.put(`manage_product/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const reajustPrice = async (
  brandId: number | string,
  percent: number | string
): Promise<Product[]> => {
  const { data } = await api.put(
    // note: match your Django URLconf, including the trailing slash if you use it
    `reajust_price/${brandId}/${percent}/`
  );
  // your view returns Response(serializer.data) which is the array
  return data as Product[];
};

export const restorePrice = async (
  brandId: number | string,
): Promise<Product[]> => {
  const { data } = await api.put(
    // note: match your Django URLconf, including the trailing slash if you use it
    `restore_price/${brandId}/`
  );
  // your view returns Response(serializer.data) which is the array
  return data as Product[];
};

export const login = async (data: FormData) => {
  const res = await api.post("login/", data);
  return res.data;
};

export const getUsers = async (page = 1): Promise<Paginated<User>> => {
  const response = await api.get<Paginated<User>>(`users/?page=${page}`);
  return response.data;
};

export const updateUserStatus = async (id: number) => {
  const response = await api.put(
    `users/${id}/toggle-active/`,
  );
  return response.data;
};

export const searchUsers = async (q: string, page = 1) => {
  const { data } = await api.get<Paginated<User>>("users/search/", {
    params: { q, page }
  });
  return data;
};

export default api;
