"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DocumentUpload } from "@/components/forms/DocumentUpload";
import { getPatientDocuments, uploadDocument, updateDocumentStatus, Document } from "@/lib/api/documents";

export default function PatientDocumentsPage() {
  const params = useParams();
  const patientId = params.id as string;

  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (patientId) {
      fetchDocuments();
    }
  }, [patientId]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await getPatientDocuments(patientId);
      if (response.success) {
        setDocuments(response.data || []);
      } else {
        setError(response.error || "Erro ao carregar documentos");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (documentType: string, file: File) => {
    const response = await uploadDocument(patientId, documentType, file);
    if (response.success) {
      await fetchDocuments();
      setShowUpload(false);
    } else {
      alert(response.error || "Erro ao fazer upload");
    }
  };

  const handleStatusChange = async (documentId: string, status: string) => {
    const response = await updateDocumentStatus(documentId, status);
    if (response.success) {
      await fetchDocuments();
    } else {
      alert(response.error || "Erro ao atualizar status");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      em_analise: { label: "Em Análise", className: "bg-yellow-900/30 text-yellow-400 border border-yellow-700" },
      aprovado: { label: "Aprovado", className: "bg-green-900/30 text-green-400 border border-green-700" },
      rejeitado: { label: "Rejeitado", className: "bg-red-900/30 text-red-400 border border-red-700" },
    };
    const info = statusMap[status] || { label: status, className: "bg-gray-900/30 text-gray-400 border border-gray-700" };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${info.className}`}>{info.label}</span>;
  };

  const getDocumentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      rg_cpf: "RG/CPF",
      comprovante_residencia: "Comprovante de Residência",
      laudo_medico: "Laudo Médico",
      receita_medica: "Receita Médica",
      autorizacao_anvisa: "Autorização ANVISA",
      termo_consentimento: "Termo de Consentimento",
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#52b788]">Carregando documentos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Documentos do Paciente</h2>
        <p className="text-[#52b788]">Gerencie os documentos do paciente</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowUpload(true)}
          className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg transition-all"
        >
          + Novo Documento
        </button>
      </div>

      {showUpload && (
        <Card className="border-[#2d6a4f] bg-[#1a3a2a] shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="text-white">Upload de Documento</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentUpload
              patientId={patientId}
              onUpload={handleUpload}
              onCancel={() => setShowUpload(false)}
            />
          </CardContent>
        </Card>
      )}

      <Card className="border-[#2d6a4f] bg-[#1a3a2a] shadow-xl shadow-black/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Tipo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Arquivo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Data</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d6a4f]/30">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#2d6a4f]/20 transition-colors">
                    <td className="px-4 py-3 text-white">{getDocumentTypeLabel(doc.document_type)}</td>
                    <td className="px-4 py-3 text-[#52b788]">{doc.file_name}</td>
                    <td className="px-4 py-3">{getStatusBadge(doc.status)}</td>
                    <td className="px-4 py-3 text-[#52b788]">
                      {new Date(doc.created_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded-lg transition-all"
                        >
                          Visualizar
                        </a>
                        {doc.status === "em_analise" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(doc.id, "aprovado")}
                              className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white text-xs rounded-lg transition-all"
                            >
                              Aprovar
                            </button>
                            <button
                              onClick={() => handleStatusChange(doc.id, "rejeitado")}
                              className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-xs rounded-lg transition-all"
                            >
                              Rejeitar
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {documents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#52b788]">Nenhum documento cadastrado.</p>
        </div>
      )}
    </div>
  );
}