"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getPatientAnamneses, Anamnese } from "@/lib/api/anamnesis";

export default function PatientAnamnesisPage() {
  const params = useParams();
  const patientId = params.id as string;

  const [anamneses, setAnamneses] = useState<Anamnese[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patientId) {
      fetchAnamneses();
    }
  }, [patientId]);

  const fetchAnamneses = async () => {
    setLoading(true);
    try {
      const response = await getPatientAnamneses(patientId);
      if (response.success) {
        setAnamneses(response.data || []);
      }
    } catch (error) {
      console.error("Erro ao carregar anamneses", error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type: string) => {
    const map: Record<string, string> = {
      inicial: "Inicial",
      rastreio_1_mes: "Rastreio 1 Mês",
      rastreio_3_meses: "Rastreio 3 Meses",
      rastreio_6_meses: "Rastreio 6 Meses",
      acompanhamento_continuo: "Acompanhamento Contínuo",
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
          <h1 className="text-3xl font-bold text-white">Acolhimento</h1>
          <p className="text-[#52b788]">Histórico de anamneses do paciente</p>
        </div>
        <Link
          href={`/dashboard/anamnesis/new?patientId=${patientId}`}
          className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg"
        >
          + Nova Anamnese
        </Link>
      </div>

      {anamneses.length === 0 ? (
        <div className="text-center py-8 text-[#52b788]">
          Nenhuma anamnese cadastrada.
        </div>
      ) : (
        <div className="grid gap-4">
          {anamneses.map((a) => (
            <Card key={a.id} className="border-[#2d6a4f] bg-[#1a3a2a]">
              <CardHeader>
                <CardTitle className="text-white flex justify-between">
                  <span>{getTypeLabel(a.type)}</span>
                  <span className="text-sm text-[#52b788]">
                    {new Date(a.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div><span className="text-[#52b788]">Sintomas:</span> {a.symptoms || "-"}</div>
                  <div><span className="text-[#52b788]">Intensidade:</span> {a.symptom_intensity || "-"}</div>
                  <div><span className="text-[#52b788]">Efeitos colaterais:</span> {a.side_effects || "-"}</div>
                  <div><span className="text-[#52b788]">Adesão:</span> {a.treatment_adherence || "-"}</div>
                  <div><span className="text-[#52b788]">Melhorias:</span> {a.improvements || "-"}</div>
                  <div><span className="text-[#52b788]">Peso:</span> {a.weight ? `${a.weight}kg` : "-"}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}