import api from "./client";

export interface Anamnese {
  id: string;
  patient_id: string;
  patient_name: string;
  type: string;
  symptoms: string;
  symptom_intensity: number;
  side_effects: string;
  side_effect_intensity: number;
  treatment_adherence: string;
  challenges: string;
  improvements: string;
  additional_notes: string;
  weight: number;
  blood_pressure: string;
  heart_rate: number;
  created_at: string;
}

export async function getPatientAnamneses(patientId: string): Promise<any> {
  try {
    const response = await api.get(`/api/patients/${patientId}/anamnesis`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function createAnamnese(patientId: string, data: any): Promise<any> {
  try {
    const response = await api.post(`/api/patients/${patientId}/anamnesis`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}