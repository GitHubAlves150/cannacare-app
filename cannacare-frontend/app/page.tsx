import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";

export default function WelcomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-green-700 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">C</span>
            </div>
          </div>
          <CardTitle className="text-4xl text-green-800">CannaCare</CardTitle>
          <p className="text-base mt-2 text-muted-foreground">
            Sistema de gestão para associações de cannabis medicinal
          </p>
        </CardHeader>

        <CardContent>
          <div className="space-y-3 text-gray-600 text-sm">
            <p>🌿 Gerencie pacientes, receitas e pedidos</p>
            <p>📊 Controle de estoque e financeiro</p>
            <p>🤝 Acompanhamento e acolhimento</p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Link href="/login" className="w-full">
            <Button variant="primary" size="lg" className="w-full">
              Entrar no Sistema
            </Button>
          </Link>

          <p className="text-sm text-gray-500">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-green-700 font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}