import api from "./client";

export interface Subscription {
  id: string;
  patient_id: string;
  patient_name: string;
  due_date: string;
  amount: number;
  status: string;
  paid_at: string;
  created_at: string;
}

export interface Payment {
  id: string;
  patient_id: string;
  patient_name: string;
  payment_type: string;
  payment_method: string;
  amount: number;
  status: string;
  paid_at: string;
  created_at: string;
}

export async function getSubscriptions(page = 1, limit = 20): Promise<any> {
  try {
    const response = await api.get(`/api/financial/subscriptions?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function createSubscription(data: any): Promise<any> {
  try {
    const response = await api.post("/api/financial/subscriptions", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function getPayments(page = 1, limit = 20): Promise<any> {
  try {
    const response = await api.get(`/api/financial/payments?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function createPayment(data: any): Promise<any> {
  try {
    const response = await api.post("/api/financial/payments", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function updatePaymentStatus(id: string, status: string): Promise<any> {
  try {
    const response = await api.patch(`/api/financial/payments/${id}/status`, { status });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function getPatientFinancialStatus(patientId: string): Promise<any> {
  try {
    const response = await api.get(`/api/financial/patient/${patientId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function getOverdueSubscriptions(): Promise<any> {
  try {
    const response = await api.get("/api/financial/overdue");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}