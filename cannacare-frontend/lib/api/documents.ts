import api from "./client";

export interface Document {
  id: string;
  patient_id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  status: string;
  created_at: string;
}

export interface DocumentResponse {
  success: boolean;
  data: Document[];
  error?: string;
}

export async function getPatientDocuments(patientId: string): Promise<DocumentResponse> {
  try {
    const response = await api.get(`/api/patients/${patientId}/documents`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
    return {
      success: false,
      error: "Erro de conexão com o servidor",
    } as DocumentResponse;
  }
}

export async function uploadDocument(patientId: string, documentType: string, file: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("document_type", documentType);
    formData.append("file", file);

    const response = await api.post(`/api/patients/${patientId}/documents`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export async function updateDocumentStatus(documentId: string, status: string): Promise<any> {
  try {
    const response = await api.patch(`/api/documents/${documentId}/status`, { status });
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

export async function downloadDocument(documentId: string): Promise<any> {
  try {
    const response = await api.get(`/api/documents/${documentId}/download`, {
      responseType: "blob",
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