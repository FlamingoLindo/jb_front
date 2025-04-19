import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Brand {
  id: number;
  name: string;
  logo: string;
}

export interface Product {
  id: number;
  code: number;
  name: string;
  description: string;
  price: string;
  original_price: string;
  image: string;
};

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

export default api;
