"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { getOrders, updateOrderStatus, Order } from "@/lib/api/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrders();
      if (response.success) {
        setOrders(response.data.items || []);
      }
    } catch (error) {
      console.error("Erro ao carregar pedidos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const response = await updateOrderStatus(id, status);
    if (response.success) {
      await fetchOrders();
    } else {
      alert(response.error || "Erro ao atualizar status");
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; className: string }> = {
      pendente: { label: "Pendente", className: "bg-yellow-900/30 text-yellow-400 border border-yellow-700" },
      separado: { label: "Separado", className: "bg-blue-900/30 text-blue-400 border border-blue-700" },
      dispensa: { label: "Dispensa", className: "bg-purple-900/30 text-purple-400 border border-purple-700" },
      correio: { label: "Correio", className: "bg-indigo-900/30 text-indigo-400 border border-indigo-700" },
      entregue: { label: "Entregue", className: "bg-green-900/30 text-green-400 border border-green-700" },
      cancelado: { label: "Cancelado", className: "bg-red-900/30 text-red-400 border border-red-700" },
    };
    return map[status] || { label: status, className: "bg-gray-900/30 text-gray-400 border border-gray-700" };
  };

  const getNextStatuses = (current: string): string[] => {
    const flow: Record<string, string[]> = {
      pendente: ["separado", "cancelado"],
      separado: ["dispensa", "cancelado"],
      dispensa: ["correio", "cancelado"],
      correio: ["entregue", "cancelado"],
      entregue: [],
      cancelado: [],
    };
    return flow[current] || [];
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Pedidos</h1>
          <p className="text-[#52b788]">Gerencie os pedidos dos pacientes</p>
        </div>
        <Link
          href="/dashboard/orders/new"
          className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
        >
          + Novo Pedido
        </Link>
      </div>

      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
              <tr>
                <th className="px-4 py-3 text-left text-[#52b788]">Paciente</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Total</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Status</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Data</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d6a4f]/30">
              {orders.map((order) => {
                const status = getStatusBadge(order.status);
                const nextStatuses = getNextStatuses(order.status);
                return (
                  <tr key={order.id} className="hover:bg-[#2d6a4f]/20">
                    <td className="px-4 py-3 text-white">{order.patient_name}</td>
                    <td className="px-4 py-3 text-[#52b788]">
                      R$ {order.total_amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#52b788]">
                      {new Date(order.order_date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded-lg"
                        >
                          Detalhes
                        </Link>
                        {nextStatuses.map((next) => (
                          <button
                            key={next}
                            onClick={() => handleStatusChange(order.id, next)}
                            className={`px-3 py-1 text-white text-xs rounded-lg ${
                              next === "cancelado"
                                ? "bg-red-700 hover:bg-red-600"
                                : "bg-green-700 hover:bg-green-600"
                            }`}
                          >
                            {next === "cancelado" ? "Cancelar" : next}
                          </button>
                        ))}
                      </div>
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