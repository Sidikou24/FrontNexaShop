// src/services/apiService.ts
import axios, { type AxiosRequestConfig } from 'axios';
import { Product, type ProductDto, type ApiResponse } from '@/models/product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';

// Configuration de base d'axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fonction helper pour gérer les erreurs
const handleApiError = (error: any, defaultMessage: string): never => {
  console.error('API Error:', error);
  if (error.response?.data?.errors) {
    throw new Error(error.response.data.errors.join(', '));
  }
  throw new Error(defaultMessage);
};

export default {
  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<ApiResponse<ProductDto[]>>('/api/StoreManagement/Product');
      const data = response.data;

      if (!data.success) {
        throw new Error(data.errors?.join(', ') || 'Échec de récupération des produits');
      }

      // Transformation des données
      return data.body.map(Product.fromApi);
    } catch (error) {
      return handleApiError(error, 'Erreur lors de la récupération des produits');
    }
  },

  async fetchProductById(id: number): Promise<Product> {
    try {
      const response = await apiClient.get<ApiResponse<ProductDto>>(`/api/StoreManagement/Product/${id}`);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.errors?.join(', ') || 'Produit non trouvé');
      }

      return Product.fromApi(data.body);
    } catch (error) {
      return handleApiError(error, `Erreur lors de la récupération du produit (ID: ${id})`);
    }
  },

  async createProduct(productData: FormData): Promise<Product> {
    try {
      // Pour FormData, nous devons changer le header Content-Type
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = await apiClient.post<ApiResponse<ProductDto>>(
        '/api/StoreManagement/Product',
        productData,
        config
      );
      
      const data = response.data;

      if (!data.success) {
        throw new Error(data.errors?.join(', ') || 'Échec de création du produit');
      }

      return Product.fromApi(data.body);
    } catch (error) {
      return handleApiError(error, 'Erreur lors de la création du produit');
    }
  },

  async updateProduct(id: number, productData: FormData): Promise<Product> {
    try {
      // Pour FormData, nous devons changer le header Content-Type
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = await apiClient.put<ApiResponse<ProductDto>>(
        `/api/StoreManagement/Product/${id}`,
        productData,
        config
      );
      
      const data = response.data;

      if (!data.success) {
        throw new Error(data.errors?.join(', ') || 'Échec de mise à jour du produit');
      }

      return Product.fromApi(data.body);
    } catch (error) {
      return handleApiError(error, `Erreur lors de la mise à jour du produit (ID: ${id})`);
    }
  },

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const response = await apiClient.delete<ApiResponse<boolean>>(`/api/StoreManagement/Product/${id}`);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.errors?.join(', ') || 'Échec de suppression du produit');
      }

      return data.body;
    } catch (error) {
      return handleApiError(error, `Erreur lors de la suppression du produit (ID: ${id})`);
    }
  }
};