"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import api from "@/lib/api/client";

interface Prescription {
  id: string;
  patient_name: string;
  doctor_name: string;
  cid: string;
  expiration_date: string;
  status: string;
  days_until_expire: number;
}

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await api.get("/api/prescriptions");
      if (response.data.success) {
        setPrescriptions(response.data.data.items || []);
      }
    } catch (error) {
      console.error("Erro ao carregar receitas", error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (id: string) => {
    try {
      const response = await api.get(`/api/prescriptions/validate/${id}`);
      alert(response.data.message || "Receita validada!");
      await fetchPrescriptions();
    } catch (error) {
      alert("Erro ao validar receita");
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; className: string }> = {
      valida: { label: "Válida", className: "bg-green-900/30 text-green-400 border border-green-700" },
      proxima_vencer: { label: "Próxima a vencer", className: "bg-yellow-900/30 text-yellow-400 border border-yellow-700" },
      vencida: { label: "Vencida", className: "bg-red-900/30 text-red-400 border border-red-700" },
    };
    const info = map[status] || { label: status, className: "bg-gray-900/30 text-gray-400 border border-gray-700" };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${info.className}`}>{info.label}</span>;
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Receitas</h1>
          <p className="text-[#52b788]">Gerencie as receitas médicas</p>
        </div>
        <button className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg">
          + Nova Receita
        </button>
      </div>

      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
              <tr>
                <th className="px-4 py-3 text-left text-[#52b788]">Paciente</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Médico</th>
                <th className="px-4 py-3 text-left text-[#52b788]">CID</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Validade</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Status</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d6a4f]/30">
              {prescriptions.map((p) => (
                <tr key={p.id} className="hover:bg-[#2d6a4f]/20">
                  <td className="px-4 py-3 text-white">{p.patient_name}</td>
                  <td className="px-4 py-3 text-[#52b788]">{p.doctor_name}</td>
                  <td className="px-4 py-3 text-[#52b788]">{p.cid}</td>
                  <td className="px-4 py-3 text-[#52b788]">
                    {new Date(p.expiration_date).toLocaleDateString("pt-BR")}
                    {p.days_until_expire <= 15 && p.status !== "vencida" && (
                      <span className="ml-2 text-yellow-400 text-xs">({p.days_until_expire} dias)</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(p.status)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleValidate(p.id)}
                      className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded-lg"
                    >
                      Validar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}