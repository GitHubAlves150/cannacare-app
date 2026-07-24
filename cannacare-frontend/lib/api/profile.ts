import api from "./client";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export async function getProfile(): Promise<any> {
  try {
    const response = await api.get("/api/users/me");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function updateProfile(data: { name: string; email: string }): Promise<any> {
  try {
    const response = await api.put("/api/users/me", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}

export async function changePassword(data: {
  current_password: string;
  new_password: string;
}): Promise<any> {
  try {
    const response = await api.put("/api/users/me/password", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return { success: false, error: "Erro de conexão" };
  }
}