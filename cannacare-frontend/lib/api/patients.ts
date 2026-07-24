import api from "./client";

export interface Patient {
  id: string;
  full_name: string;
  cpf: string;
  email: string;
  status: string;
  created_at: string;
}

export interface PatientResponse {
  success: boolean;
  data: {
    items: Patient[];
    total: number;
    page: number;
    limit: number;
  };
  error?: string;
}

export async function getPatients(page = 1, limit = 20): Promise<PatientResponse> {
  try {
    const response = await api.get(`/api/patients?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      error: "Erro de conexão com o servidor",
    } as PatientResponse;
  }
}

export async function updatePatientStatus(
  patientId: string,
  status: string,
  reason?: string
): Promise<any> {
  try {
    const response = await api.patch(`/api/patients/${patientId}/status`, {
      status,
      reason,
    });
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