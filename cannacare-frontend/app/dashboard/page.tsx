"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const stats = [
  { title: "Pacientes Ativos", value: 24, change: "+3 este mês" },
  { title: "Prescrições Válidas", value: 18, change: "+5 este mês" },
  { title: "Itens em Estoque", value: 8, change: "2 baixos" },
];

const pendingPatients = [
  { name: "Joaquim Silva", email: "joac@hotmail.com", status: "approved" },
  { name: "Ana Rimaes", email: "anaimha@gmail.com", status: "pending" },
  { name: "Lucas", email: "lucas@gmail.com", status: "pending" },
  { name: "Lucas Lorenço Alves", email: "lucaslorencoalves.me@gmail.com", status: "pending" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-card-foreground">Visão Geral</h2>
        <p className="text-muted-foreground">Bem-vindo ao centro de gerenciamento da sua associação.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-[#2d6a4f]/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-[#2d6a4f]">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-card-foreground mb-4">Fila Regulatória</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Selecione um paciente na fila regulatória para auditar o prontuário.
        </p>

        <Card className="border-[#2d6a4f]/20">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Paciente</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pendingPatients.map((patient, index) => (
                    <tr key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                      <td className="px-4 py-3 text-card-foreground">{patient.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{patient.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          patient.status === "approved"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}>
                          {patient.status === "approved" ? "Aprovado" : "Documentação Pendente"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-card-foreground mb-4">Ações Rápidas do Sistema</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Utilize o menu lateral para gerenciar os módulos operacionais.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#52b788] text-white rounded-lg transition-all">
            ➕ Cadastrar Novo Paciente
          </button>
          <button className="px-4 py-2 bg-[#2d6a4f] hover:bg-[#52b788] text-white rounded-lg transition-all">
            🧪 Nova Dispensação de Óleo
          </button>
        </div>
      </div>
    </div>
  );
}