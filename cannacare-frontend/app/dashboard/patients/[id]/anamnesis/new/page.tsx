"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { createAnamnese } from "@/lib/api/anamnesis";

export default function NewAnamnesePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId") || "";

  const [formData, setFormData] = useState({
    type: "inicial",
    symptoms: "",
    symptom_intensity: "",
    side_effects: "",
    side_effect_intensity: "",
    treatment_adherence: "alta",
    challenges: "",
    improvements: "",
    additional_notes: "",
    weight: "",
    blood_pressure: "",
    heart_rate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) {
      alert("ID do paciente não fornecido");
      return;
    }

    setLoading(true);
    const data = {
      ...formData,
      symptom_intensity: formData.symptom_intensity ? Number(formData.symptom_intensity) : null,
      side_effect_intensity: formData.side_effect_intensity ? Number(formData.side_effect_intensity) : null,
      weight: formData.weight ? Number(formData.weight) : null,
      heart_rate: formData.heart_rate ? Number(formData.heart_rate) : null,
    };

    try {
      const response = await createAnamnese(patientId, data);
      if (response.success) {
        router.push(`/dashboard/patients/${patientId}/anamnesis`);
      } else {
        alert(response.error || "Erro ao criar anamnese");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Nova Anamnese</h1>
        <p className="text-[#52b788]">Preencha os dados do paciente</p>
      </div>

      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-1">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
              >
                <option value="inicial">Inicial</option>
                <option value="rastreio_1_mes">Rastreio 1 Mês</option>
                <option value="rastreio_3_meses">Rastreio 3 Meses</option>
                <option value="rastreio_6_meses">Rastreio 6 Meses</option>
                <option value="acompanhamento_continuo">Acompanhamento Contínuo</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Sintomas</label>
                <input
                  type="text"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  placeholder="Descreva os sintomas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Intensidade (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.symptom_intensity}
                  onChange={(e) => setFormData({ ...formData, symptom_intensity: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Efeitos Colaterais</label>
                <input
                  type="text"
                  value={formData.side_effects}
                  onChange={(e) => setFormData({ ...formData, side_effects: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  placeholder="Descreva os efeitos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Intensidade (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.side_effect_intensity}
                  onChange={(e) => setFormData({ ...formData, side_effect_intensity: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-1">Adesão ao Tratamento</label>
              <select
                value={formData.treatment_adherence}
                onChange={(e) => setFormData({ ...formData, treatment_adherence: e.target.value })}
                className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
              >
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-1">Desafios</label>
              <input
                type="text"
                value={formData.challenges}
                onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                placeholder="Desafios enfrentados"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-1">Melhorias</label>
              <input
                type="text"
                value={formData.improvements}
                onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                placeholder="Melhorias observadas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#52b788] mb-1">Observações</label>
              <textarea
                value={formData.additional_notes}
                onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                rows={3}
                placeholder="Observações adicionais"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Pressão</label>
                <input
                  type="text"
                  value={formData.blood_pressure}
                  onChange={(e) => setFormData({ ...formData, blood_pressure: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  placeholder="120/80"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#52b788] mb-1">Frequência Cardíaca</label>
                <input
                  type="number"
                  value={formData.heart_rate}
                  onChange={(e) => setFormData({ ...formData, heart_rate: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0d1f1a] border border-[#2d6a4f] rounded-lg text-white"
                  placeholder="72"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg disabled:opacity-50"
              >
                {loading ? "Salvando..." : "Salvar Anamnese"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}