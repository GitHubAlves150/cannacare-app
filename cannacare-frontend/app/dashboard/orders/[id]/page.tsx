"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import api from "@/lib/api/client";
import { updateOrderStatus, updateTracking, generateLabel } from "@/lib/api/orders";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trackingCode, setTrackingCode] = useState("");
  const [carrier, setCarrier] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/orders/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao carregar pedido", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    const response = await updateOrderStatus(orderId, status);
    if (response.success) {
      await fetchOrder();
    } else {
      alert(response.error || "Erro ao atualizar status");
    }
  };

  const handleTrackingSubmit = async () => {
    if (!trackingCode || !carrier) {
      alert("Preencha todos os campos");
      return;
    }
    const response = await updateTracking(orderId, trackingCode, carrier);
    if (response.success) {
      await fetchOrder();
      setTrackingCode("");
      setCarrier("");
    } else {
      alert(response.error || "Erro ao atualizar rastreio");
    }
  };

  const handleGenerateLabel = async () => {
    const response = await generateLabel(orderId);
    if (response.success) {
      alert("Etiqueta gerada com sucesso!");
      await fetchOrder();
    } else {
      alert(response.error || "Erro ao gerar etiqueta");
    }
  };

  if (loading) {
    return <div className="text-[#52b788] p-6">Carregando...</div>;
  }

  if (!order) {
    return <div className="text-red-400 p-6">Pedido não encontrado</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Pedido #{orderId.slice(0, 8)}</h1>
          <p className="text-[#52b788]">Detalhes do pedido</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
        >
          Voltar
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
          <CardHeader>
            <CardTitle className="text-white">Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-[#52b788]">Paciente:</span> {order.patient_name}</p>
            <p><span className="text-[#52b788]">Status:</span> {order.status}</p>
            <p><span className="text-[#52b788]">Total:</span> R$ {order.total_amount?.toFixed(2)}</p>
            <p><span className="text-[#52b788]">Data:</span> {new Date(order.order_date).toLocaleString("pt-BR")}</p>
          </CardContent>
        </Card>

        <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
          <CardHeader>
            <CardTitle className="text-white">Ações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {order.status === "pendente" && (
                <button
                  onClick={() => handleStatusChange("separado")}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-sm"
                >
                  Separar
                </button>
              )}
              {order.status === "separado" && (
                <button
                  onClick={() => handleStatusChange("dispensa")}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-sm"
                >
                  Dispensar
                </button>
              )}
              {order.status === "dispensa" && (
                <button
                  onClick={() => handleStatusChange("correio")}
                  className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-sm"
                >
                  Enviar para Correio
                </button>
              )}
              {(order.status === "dispensa" || order.status === "correio") && (
                <button
                  onClick={handleGenerateLabel}
                  className="px-4 py-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-lg text-sm"
                >
                  Gerar Etiqueta
                </button>
              )}
              {order.status !== "entregue" && order.status !== "cancelado" && (
                <button
                  onClick={() => handleStatusChange("cancelado")}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm"
                >
                  Cancelar
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rastreio */}
      {order.status === "correio" && (
        <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
          <CardHeader>
            <CardTitle className="text-white">Adicionar Rastreio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="flex-1 px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                placeholder="Código de rastreio"
              />
              <input
                type="text"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="flex-1 px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                placeholder="Transportadora"
              />
              <button
                onClick={handleTrackingSubmit}
                className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
              >
                Salvar
              </button>
            </div>
            {order.tracking_code && (
              <div className="mt-4 text-sm text-[#52b788]">
                Rastreio atual: {order.tracking_code} ({order.shipping_carrier})
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}