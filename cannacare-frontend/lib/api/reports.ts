import api from "./client";

export async function getPatientReport(): Promise<any> {
  try {
    const response = await api.get("/api/dashboard/patients");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function getExpiredPrescriptionsReport(): Promise<any> {
  try {
    const response = await api.get("/api/dashboard/expired-prescriptions");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function getTopDoctorsReport(): Promise<any> {
  try {
    const response = await api.get("/api/dashboard/top-doctors");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function getLowStockReport(): Promise<any> {
  try {
    const response = await api.get("/api/dashboard/low-stock");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}