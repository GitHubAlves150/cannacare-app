"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { getPayments, createPayment, updatePaymentStatus, Payment } from "@/lib/api/financial";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: "",
    payment_type: "anuidade",
    payment_method: "pix",
    amount: "",
    subscription_id: "",
    order_id: "",
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await getPayments();
      if (response.success) {
        setPayments(response.data.items || []);
      }
    } catch (error) {
      console.error("Erro ao carregar pagamentos", error);
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

    const response = await createPayment(data);
    if (response.success) {
      await fetchPayments();
      setShowForm(false);
      setFormData({
        patient_id: "",
        payment_type: "anuidade",
        payment_method: "pix",
        amount: "",
        subscription_id: "",
        order_id: "",
      });
    } else {
      alert(response.error || "Erro ao criar pagamento");
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    const response = await updatePaymentStatus(id, status);
    if (response.success) {
      await fetchPayments();
    } else {
      alert(response.error || "Erro ao atualizar status");
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; className: string }> = {
      pago: { label: "Pago", className: "bg-green-900/30 text-green-400 border border-green-700" },
      pendente: { label: "Pendente", className: "bg-yellow-900/30 text-yellow-400 border border-yellow-700" },
      recusado: { label: "Recusado", className: "bg-red-900/30 text-red-400 border border-red-700" },
      estornado: { label: "Estornado", className: "bg-gray-900/30 text-gray-400 border border-gray-700" },
    };
    return map[status] || { label: status, className: "bg-gray-900/30 text-gray-400 border border-gray-700" };
  };

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      anuidade: "Anuidade",
      compra_produto: "Compra de Produto",
      doacao: "Doação",
    };
    return map[type] || type;
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Pagamentos</h1>
          <p className="text-[#52b788]">Histórico de pagamentos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
        >
          {showForm ? "Cancelar" : "+ Novo Pagamento"}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#52b788] mb-1">Tipo</label>
                  <select
                    value={formData.payment_type}
                    onChange={(e) => setFormData({ ...formData, payment_type: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  >
                    <option value="anuidade">Anuidade</option>
                    <option value="compra_produto">Compra de Produto</option>
                    <option value="doacao">Doação</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#52b788] mb-1">Método</label>
                  <select
                    value={formData.payment_method}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  >
                    <option value="pix">PIX</option>
                    <option value="boleto">Boleto</option>
                    <option value="cartao">Cartão</option>
                    <option value="transferencia">Transferência</option>
                  </select>
                </div>
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
              {formData.payment_type === "anuidade" && (
                <div>
                  <label className="block text-sm font-medium text-[#52b788] mb-1">Anuidade</label>
                  <input
                    type="text"
                    value={formData.subscription_id}
                    onChange={(e) => setFormData({ ...formData, subscription_id: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                    placeholder="ID da anuidade"
                  />
                </div>
              )}
              {formData.payment_type === "compra_produto" && (
                <div>
                  <label className="block text-sm font-medium text-[#52b788] mb-1">Pedido</label>
                  <input
                    type="text"
                    value={formData.order_id}
                    onChange={(e) => setFormData({ ...formData, order_id: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                    placeholder="ID do pedido"
                  />
                </div>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
              >
                Registrar Pagamento
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
                <th className="px-4 py-3 text-left text-[#52b788]">Tipo</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Método</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Valor</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Status</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d6a4f]/30">
              {payments.map((payment) => {
                const status = getStatusBadge(payment.status);
                return (
                  <tr key={payment.id} className="hover:bg-[#2d6a4f]/20">
                    <td className="px-4 py-3 text-white">{payment.patient_name}</td>
                    <td className="px-4 py-3 text-[#52b788]">{getTypeLabel(payment.payment_type)}</td>
                    <td className="px-4 py-3 text-[#52b788]">{payment.payment_method.toUpperCase()}</td>
                    <td className="px-4 py-3 text-[#52b788]">
                      R$ {payment.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {payment.status === "pendente" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(payment.id, "pago")}
                            className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white text-xs rounded-lg"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(payment.id, "recusado")}
                            className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white text-xs rounded-lg"
                          >
                            Recusar
                          </button>
                        </div>
                      )}
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