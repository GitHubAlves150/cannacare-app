import api from "./client";

export interface Doctor {
  id: string;
  name: string;
  crm: string;
  crm_state: string;
  specialty: string;
  phone: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface DoctorResponse {
  success: boolean;
  data: {
    items: Doctor[];
    total: number;
    page: number;
    limit: number;
  };
  error?: string;
}

export async function getDoctors(page = 1, limit = 20): Promise<DoctorResponse> {
  try {
    const response = await api.get(`/api/doctors?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      error: "Erro de conexão com o servidor",
    } as DoctorResponse;
  }
}

export async function createDoctor(data: any): Promise<any> {
  try {
    const response = await api.post("/api/doctors", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      error: "Erro de conexão com o servidor",
    };
  }
}

export async function updateDoctor(id: string, data: any): Promise<any> {
  try {
    const response = await api.put(`/api/doctors/${id}`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      error: "Erro de conexão com o servidor",
    };
  }
}

export async function toggleDoctorStatus(id: string, isActive: boolean): Promise<any> {
  try {
    const response = await api.put(`/api/doctors/${id}`, { is_active: isActive });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      error: "Erro de conexão com o servidor",
    };
  }
}