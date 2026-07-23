import api from "./client";

export interface DashboardStats {
  patients: {
    total: number;
    approved: number;
    pending: number;
  };
  prescriptions: {
    total: number;
    valid: number;
    expired: number;
  };
  stock: {
    total_items: number;
    low_stock: number;
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await api.get("/api/dashboard/overview");
    if (response.data.success) {
      const data = response.data.data;
      return {
        patients: {
          total: data.patients?.total || 0,
          approved: data.patients?.approved || 0,
          pending: data.patients?.pending || 0,
        },
        prescriptions: {
          total: data.prescriptions?.total || 0,
          valid: data.prescriptions?.valid || 0,
          expired: data.prescriptions?.expired || 0,
        },
        stock: {
          total_items: data.stock?.total_quantity || 0,
          low_stock: data.stock?.low_stock_items || 0,
        },
      };
    }
    throw new Error("Erro ao carregar dados");
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    throw error;
  }
}