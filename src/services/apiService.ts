import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type { Product } from '@/types/Product'; // à créer si non existant

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';

// Configuration de base d'axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL
});

const apiService = {
  async fetchProducts(): Promise<Product[]> {
    try {
      const response: AxiosResponse<Product[]> = await apiClient.get('/api/StoreManagement/Product');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  },

  async fetchProductById(id: number | string): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await apiClient.get(`/api/StoreManagement/Product/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product by id');
    }
  },

  async createProduct(formData: FormData): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await apiClient.post('/api/StoreManagement/Product', formData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create product');
    }
  },

  async updateProduct(id: number | string, formData: FormData): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await apiClient.put(`/api/StoreManagement/Product/${id}`, formData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  },

  async deleteProduct(id: number | string): Promise<{ success: boolean; message: string }> {
    try {
      const response: AxiosResponse<{ success: boolean; message: string }> =
        await apiClient.delete(`/api/StoreManagement/Product/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }
};

export default apiService;
