import api from "./client";

export interface Order {
  id: string;
  patient_id: string;
  patient_name: string;
  prescription_id: string;
  status: string;
  total_amount: number;
  notes: string;
  order_date: string;
  tracking_code: string;
  shipping_carrier: string;
  created_at: string;
}

export async function getOrders(page = 1, limit = 20): Promise<any> {
  try {
    const response = await api.get(`/api/orders?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function createOrder(data: any): Promise<any> {
  try {
    const response = await api.post("/api/orders", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function updateOrderStatus(id: string, status: string, notes?: string): Promise<any> {
  try {
    const response = await api.patch(`/api/orders/${id}/status`, { status, notes });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function updateTracking(id: string, trackingCode: string, carrier: string): Promise<any> {
  try {
    const response = await api.patch(`/api/orders/${id}/tracking`, {
      tracking_code: trackingCode,
      shipping_carrier: carrier,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function generateLabel(id: string): Promise<any> {
  try {
    const response = await api.post(`/api/orders/${id}/label`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}