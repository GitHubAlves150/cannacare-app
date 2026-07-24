"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import api from "@/lib/api/client";

export default function AnamnesisPage() {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/api/patients");
      if (response.data.success) {
        setPatients(response.data.data.items || []);
      }
    } catch (error) {
      console.error("Erro ao carregar pacientes", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Acolhimento</h1>
      <p className="text-[#52b788]">Selecione um paciente para ver as anamneses</p>

      <Card className="border-[#2d6a4f] bg-[#1a3a2a]">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-[#0d1f1a] border-b border-[#2d6a4f]">
              <tr>
                <th className="px-4 py-3 text-left text-[#52b788]">Paciente</th>
                <th className="px-4 py-3 text-left text-[#52b788]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d6a4f]/30">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-[#2d6a4f]/20">
                  <td className="px-4 py-3 text-[#2d6a4f]">{p.full_name}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/patients/${p.id}/anamnesis`}
                      className="px-3 py-1 bg-[#2d6a4f] hover:bg-[#409f7a] text-white text-xs rounded-lg"
                    >
                      Ver Anamneses
                    </Link>
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