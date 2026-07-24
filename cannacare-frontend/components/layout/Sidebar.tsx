"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

interface SidebarProps {
  open: boolean;
}




// ============================================================
// LISTA DE MENU - ATUALIZE AQUI!
// ============================================================
const menuItems = [
  { name: "Visão Geral", href: "/dashboard", icon: "📊" },
  { name: "Pacientes", href: "/dashboard/patients", icon: "👤" },
  { name: "Médicos", href: "/dashboard/doctors", icon: "👨‍⚕️" },
  { name: "Receitas", href: "/dashboard/prescriptions", icon: "📋" },
  { name: "Acolhimento", href: "/dashboard/anamnesis", icon: "🏥" },
  { name: "Produtos", href: "/dashboard/products", icon: "📦" },
  { name: "Estoque", href: "/dashboard/stock", icon: "🏪" },
  { name: "Pedidos", href: "/dashboard/orders", icon: "🛒" },
  { name: "Financeiro", href: "/dashboard/financial", icon: "💰" },
];

export function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-[#1a3a2a] border-r border-[#2d6a4f] transition-all duration-300 ${open ? "w-64" : "w-20"
        }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-[#2d6a4f]">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            {open && <span className="font-semibold text-white">CannaCare</span>}
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {menuItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active
                    ? "bg-[#2d6a4f] text-white"
                    : "text-[#52b788] hover:bg-[#2d6a4f]/30 hover:text-white"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {open && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#2d6a4f] p-4">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-red-400 hover:bg-red-900/30 transition-all"
          >
            <LogOut size={20} />
            {open && <span className="text-sm font-medium">Sair</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}