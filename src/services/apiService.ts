import axios from 'axios';
import {Product} from '@/models/Product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:44359';

// Configuration de base d'axios
const apiClient = axios.create({
  baseURL: API_BASE_URL
});

export default {
  async fetchProducts(): Promise<Product[]> {
    const { data } = await apiClient.get('/api/StoreManagement/Product');

    if (!data?.success) {
      throw new Error(data.errors?.join(', ') || 'API error');
    }
    // mapping unique ici
    return (data.body as ProductDto[]).map(Product.fromApi);
  },

  async fetchProductById(id) {
    try {
      const response = await apiClient.get('/api/StoreManagement/Product/' + id);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product by id');
    }
  },

  async createProduct(formData) {
    try {
      const response = await apiClient.post('/api/StoreManagement/Product', formData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create product');
    }
  },

  async updateProduct(id, formData) {
    try {
      const response = await apiClient.put('/api/StoreManagement/Product/' + id, formData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  },

  async deleteProduct(id) {
    try {
      const response = await apiClient.delete('/api/StoreManagement/Product/' + id);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }
};
