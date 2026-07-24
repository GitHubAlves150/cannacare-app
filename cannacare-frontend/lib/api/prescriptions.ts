import api from "./client";

export interface PrescriptionItem {
  product_id: string;
  dosage_instructions: string;
  quantity_recommended: number;
}

export interface Prescription {
  id: string;
  patient_id: string;
  patient_name: string;
  doctor_id: string;
  doctor_name: string;
  cid: string;
  issue_date: string;
  expiration_date: string;
  status: string;
  is_active: boolean;
  items: PrescriptionItem[];
  days_until_expire: number;
  created_at: string;
}

export interface PrescriptionResponse {
  success: boolean;
  data: {
    items: Prescription[];
    total: number;
    page: number;
    limit: number;
  };
  error?: string;
}

export async function getPrescriptions(page = 1, limit = 20): Promise<PrescriptionResponse> {
  try {
    const response = await api.get(`/api/prescriptions?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      error: "Erro de conexão com o servidor",
    } as PrescriptionResponse;
  }
}

export async function createPrescription(data: any): Promise<any> {
  try {
    const response = await api.post("/api/prescriptions", data);
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

export async function validatePrescription(id: string): Promise<any> {
  try {
    const response = await api.get(`/api/prescriptions/validate/${id}`);
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