"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { getSubscriptions, createSubscription, Subscription } from "@/lib/api/financial";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: "",
    due_date: "",
    amount: "",
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const response = await getSubscriptions();
      if (response.success) {
        setSubscriptions(response.data.items || []);
      }
    } catch (error) {
      console.error("Erro ao carregar anuidades", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      amount: Number(formData.amount),
    };

    const response = await createSubscription(data);
    if (response.success) {
      await fetchSubscriptions();
      setShowForm(false);
      setFormData({ patient_id: "", due_date: "", amount: "" });
    } else {
      alert(response.error || "Erro ao criar anuidade");
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; className: string }> = {
      pago: { label: "Pago", className: "bg-green-900/30 text-green-400 border border-green-700" },
      pendente: { label: "Pendente", className: "bg-yellow-900/30 text-yellow-400 border border-yellow-700" },
      atrasado: { label: "Atrasado", className: "bg-red-900/30 text-red-400 border border-red-700" },
      cancelado: { label: "Cancelado", className: "bg-gray-900/30 text-gray-400 border border-gray-700" },
    };
    return map[status] || { label: status, className: "bg-gray-900/30 text-gray-400 border border-gray-700" };
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Anuidades</h1>
          <p className="text-[#52b788]">Gerencie as anuidades dos pacientes</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
        >
          {showForm ? "Cancelar" : "+ Nova Anuidade"}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Paciente</label>
                <input
                  type="text"
                  value={formData.patient_id}
                  onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  placeholder="ID do paciente"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Data de Vencimento</label>
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Valor</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  placeholder="150.00"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
              >
                Criar Anuidade
              </button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tabela */}
      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
              <tr>
                <th className="px-4 py-3 text-left text-[#52b788]">Paciente</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Vencimento</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Valor</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d6a4f]/30">
              {subscriptions.map((sub) => {
                const status = getStatusBadge(sub.status);
                return (
                  <tr key={sub.id} className="hover:bg-[#2d6a4f]/20">
                    <td className="px-4 py-3 text-white">{sub.patient_name}</td>
                    <td className="px-4 py-3 text-[#52b788]">
                      {new Date(sub.due_date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-[#52b788]">
                      R$ {sub.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}