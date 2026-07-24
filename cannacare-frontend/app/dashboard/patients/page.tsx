"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getPatients, updatePatientStatus, Patient } from "@/lib/api/patients";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await getPatients();
      if (response.success) {
        setPatients(response.data.items || []);
      } else {
        setError(response.error || "Erro ao carregar pacientes");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (patientId: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const response = await updatePatientStatus(
        patientId,
        newStatus,
        `Paciente ${newStatus === "aprovado" ? "aprovado" : "rejeitado"}`
      );
      if (response.success) {
        // Atualizar a lista
        await fetchPatients();
        setSelectedPatient(null);
      } else {
        alert(response.error || "Erro ao atualizar status");
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#52b788]">Carregando pacientes...</p>
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
      {/* ==========================================================
      CABEÇALHO
      ========================================================== */}
      <div>
        <h2 className="text-3xl font-bold text-white">Fila Regulatória</h2>
        <p className="text-[#52b788]">
          Gerencie todos os pacientes da associação
        </p>
      </div>

      {/* ==========================================================
      LISTA DE PACIENTES
      ========================================================== */}
      <Card className="border-[#2d6a4f] bg-[#1a3a2a] shadow-xl shadow-black/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">CPF</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d6a4f]/30">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-[#2d6a4f]/20 transition-colors">
                    <td className="px-4 py-3 text-[#52b788]">{patient.full_name}</td>
                    <td className="px-4 py-3 text-[#52b788]">{patient.cpf}</td>
                    <td className="px-4 py-3 text-[#52b788]">{patient.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === "aprovado"
                          ? "bg-green-900/30 text-green-400 border border-green-700"
                          : patient.status === "negado"
                          ? "bg-red-900/30 text-red-400 border border-red-700"
                          : patient.status === "em_analise"
                          ? "bg-blue-900/30 text-blue-400 border border-blue-700"
                          : "bg-yellow-900/30 text-yellow-400 border border-yellow-700"
                      }`}>
                        {patient.status === "aprovado"
                          ? "Aprovado"
                          : patient.status === "negado"
                          ? "Rejeitado"
                          : patient.status === "em_analise"
                          ? "Em Análise"
                          : "Documentação Pendente"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {patient.status !== "aprovado" && patient.status !== "negado" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(patient.id, "aprovado")}
                              disabled={actionLoading}
                              className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white text-xs rounded-lg transition-all disabled:opacity-50"
                            >
                              Aprovar
                            </button>
                            <button
                              onClick={() => handleStatusChange(patient.id, "negado")}
                              disabled={actionLoading}
                              className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-xs rounded-lg transition-all disabled:opacity-50"
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

      {/* ==========================================================
      MENSAGEM QUANDO NÃO HÁ PACIENTES
      ========================================================== */}
      {patients.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#52b788]">Nenhum paciente cadastrado ainda.</p>
        </div>
      )}
    </div>
  );
}