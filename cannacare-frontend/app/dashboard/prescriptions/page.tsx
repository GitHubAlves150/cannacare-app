"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { getPrescriptions, validatePrescription, Prescription } from "@/lib/api/prescriptions";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const response = await getPrescriptions();
      if (response.success) {
        setPrescriptions(response.data.items || []);
      } else {
        setError(response.error || "Erro ao carregar receitas");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (id: string) => {
    const response = await validatePrescription(id);
    if (response.success) {
      alert(response.data.message || "Receita válida!");
      await fetchPrescriptions();
    } else {
      alert(response.error || "Erro ao validar receita");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      valida: { label: "Válida", className: "bg-green-900/30 text-green-400 border border-green-700" },
      proxima_vencer: { label: "Próxima a vencer", className: "bg-yellow-900/30 text-yellow-400 border border-yellow-700" },
      vencida: { label: "Vencida", className: "bg-red-900/30 text-red-400 border border-red-700" },
    };
    const info = statusMap[status] || { label: status, className: "bg-gray-900/30 text-gray-400 border border-gray-700" };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${info.className}`}>{info.label}</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#52b788]">Carregando receitas...</p>
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
        <h2 className="text-3xl font-bold text-white">Receitas Médicas</h2>
        <p className="text-[#52b788]">Gerencie as receitas dos pacientes</p>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg transition-all">
          + Nova Receita
        </button>
      </div>

      <Card className="border-[#2d6a4f] bg-[#1a3a2a] shadow-xl shadow-black/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Paciente</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Médico</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">CID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Validade</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d6a4f]/30">
                {prescriptions.map((prescription) => (
                  <tr key={prescription.id} className="hover:bg-[#2d6a4f]/20 transition-colors">
                    <td className="px-4 py-3 text-white">{prescription.patient_name}</td>
                    <td className="px-4 py-3 text-[#52b788]">{prescription.doctor_name}</td>
                    <td className="px-4 py-3 text-[#52b788]">{prescription.cid}</td>
                    <td className="px-4 py-3 text-[#52b788]">
                      {new Date(prescription.expiration_date).toLocaleDateString("pt-BR")}
                      {prescription.days_until_expire <= 15 && prescription.status !== "vencida" && (
                        <span className="ml-2 text-xs text-yellow-400">
                          ({prescription.days_until_expire} dias)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(prescription.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleValidate(prescription.id)}
                          className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded-lg transition-all"
                        >
                          Validar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {prescriptions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#52b788]">Nenhuma receita cadastrada ainda.</p>
        </div>
      )}
    </div>
  );
}