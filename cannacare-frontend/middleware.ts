import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ================================================================
// ROTAS PÚBLICAS - PERMITIR ACESSO SEM LOGIN
// ================================================================
const publicRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // ============================================================
  // REGRA 1: PÁGINA INICIAL (/) - SEMPRE PERMITIR ACESSO
  // ============================================================
  if (pathname === "/") {
    return NextResponse.next();
  }

  // ============================================================
  // REGRA 2: VERIFICAR SE A ROTA É PÚBLICA
  // ============================================================
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));

  // ============================================================
  // REGRA 3: SE NÃO ESTIVER LOGADO E TENTAR ACESSAR ROTA PROTEGIDA
  // ============================================================
  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // ============================================================
  // REGRA 4: SE ESTIVER LOGADO E TENTAR ACESSAR /login OU /register
  // ============================================================
  if (token && isPublicRoute) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // ============================================================
  // PERMITIR ACESSO (caso contrário)
  // ============================================================
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};