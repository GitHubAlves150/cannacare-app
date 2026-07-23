// ================================================================
// PÁGINA INICIAL
// ================================================================
// A página inicial redireciona automaticamente para o login.
// Isso porque o usuário não autenticado deve fazer login primeiro.
// ================================================================

import { redirect } from "next/navigation";

export default function HomePage() {
  // Redireciona para a página de login
  // Depois que o usuário fizer login, ele será redirecionado para o dashboard
  redirect("/login");
}