"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DoctorForm } from "@/components/forms/DoctorForm";
import { getDoctors, createDoctor, updateDoctor, toggleDoctorStatus, Doctor } from "@/lib/api/doctors";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await getDoctors();
      if (response.success) {
        setDoctors(response.data.items || []);
      } else {
        setError(response.error || "Erro ao carregar médicos");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    let response;
    if (editingDoctor) {
      response = await updateDoctor(editingDoctor.id, data);
    } else {
      response = await createDoctor(data);
    }

    if (response.success) {
      await fetchDoctors();
      setShowForm(false);
      setEditingDoctor(null);
    } else {
      alert(response.error || "Erro ao salvar médico");
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    const response = await toggleDoctorStatus(id, isActive);
    if (response.success) {
      await fetchDoctors();
    } else {
      alert(response.error || "Erro ao alterar status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#52b788]">Carregando médicos...</p>
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
        <h2 className="text-3xl font-bold text-white">Médicos</h2>
        <p className="text-[#52b788]">Gerencie os médicos prescritores</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingDoctor(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#409f7a] text-white rounded-lg transition-all"
        >
          + Novo Médico
        </button>
      </div>

      {showForm && (
        <Card className="border-[#2d6a4f] bg-[#1a3a2a] shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="text-white">
              {editingDoctor ? "Editar Médico" : "Cadastrar Médico"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DoctorForm
              doctor={editingDoctor || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingDoctor(null);
              }}
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">CRM</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Especialidade</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#52b788]">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d6a4f]/30">
                {doctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-[#2d6a4f]/20 transition-colors">
                    <td className="px-4 py-3 text-[#52b788]">{doctor.name}</td>
                    <td className="px-4 py-3 text-[#52b788]">{doctor.crm}-{doctor.crm_state}</td>
                    <td className="px-4 py-3 text-[#52b788]">{doctor.specialty}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doctor.is_active
                          ? "bg-green-900/30 text-green-400 border border-green-700"
                          : "bg-red-900/30 text-red-400 border border-red-700"
                      }`}>
                        {doctor.is_active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingDoctor(doctor);
                            setShowForm(true);
                          }}
                          className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded-lg transition-all"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleToggleStatus(doctor.id, !doctor.is_active)}
                          className={`px-3 py-1 text-white text-xs rounded-lg transition-all ${
                            doctor.is_active
                              ? "bg-red-700 hover:bg-red-600"
                              : "bg-green-700 hover:bg-green-600"
                          }`}
                        >
                          {doctor.is_active ? "Desativar" : "Ativar"}
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

      {doctors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#52b788]">Nenhum médico cadastrado ainda.</p>
        </div>
      )}
    </div>
  );
}