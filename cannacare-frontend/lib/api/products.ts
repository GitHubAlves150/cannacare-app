import api from "./client";

export interface Product {
  id: string;
  name: string;
  description: string;
  unit_price: number;
  min_stock_alert: number;
  is_active: boolean;
  created_at: string;
}

export async function getProducts(page = 1, limit = 20): Promise<any> {
  try {
    const response = await api.get(`/api/products?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function createProduct(data: any): Promise<any> {
  try {
    const response = await api.post("/api/products", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function updateProduct(id: string, data: any): Promise<any> {
  try {
    const response = await api.put(`/api/products/${id}`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function toggleProductStatus(id: string, isActive: boolean): Promise<any> {
  try {
    const response = await api.put(`/api/products/${id}`, { is_active: isActive });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function getLowStock(): Promise<any> {
  try {
    const response = await api.get("/api/products/low-stock");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}