"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, UserCircle } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  "/dashboard": "Visão Geral",
  "/dashboard/patients": "Pacientes",
  "/dashboard/doctors": "Médicos",
  "/dashboard/prescriptions": "Receitas",
  "/dashboard/stock": "Estoque",
  "/dashboard/orders": "Pedidos",
  "/dashboard/financial": "Financeiro",
};

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pageTitles[pathname]) return pageTitles[pathname];
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#1a3a2a]/95 backdrop-blur border-b border-[#2d6a4f]">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-1 rounded-lg hover:bg-[#2d6a4f]/30 lg:hidden text-white"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-white">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-[#2d6a4f]/30 relative">
            <Bell size={20} className="text-[#52b788]" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
          <button className="p-1 rounded-full hover:bg-[#2d6a4f]/30">
            <UserCircle size={32} className="text-[#52b788]" />
          </button>
        </div>
      </div>
    </header>
  );
}