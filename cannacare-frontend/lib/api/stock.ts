import api from "./client";

export interface Lot {
  id: string;
  product_id: string;
  product_name: string;
  lot_number: string;
  expiration_date: string;
  current_quantity: number;
  initial_quantity: number;
  supplier: string;
  is_expired: boolean;
  days_until_expire: number;
  created_at: string;
}

export interface Movement {
  id: string;
  product_lot_id: string;
  product_name: string;
  lot_number: string;
  type: string;
  quantity: number;
  previous_quantity: number;
  new_quantity: number;
  notes: string;
  created_at: string;
}

export async function getLots(page = 1, limit = 20): Promise<any> {
  try {
    const response = await api.get(`/api/stock/lots?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function createLot(data: any): Promise<any> {
  try {
    const response = await api.post("/api/stock/lots", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function adjustStock(data: any): Promise<any> {
  try {
    const response = await api.post("/api/stock/adjust", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function getMovements(page = 1, limit = 20): Promise<any> {
  try {
    const response = await api.get(`/api/stock/movements?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function getExpiringLots(): Promise<any> {
  try {
    const response = await api.get("/api/stock/expiring");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}