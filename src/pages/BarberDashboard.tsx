import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ServiceEntry } from "@/components/ServiceEntry"

const BarberDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Dashboard do Barbeiro</h1>
            <p className="text-muted-foreground">Bem-vindo de volta</p>
          </div>
          <Button variant="outline">Atualizar Dados</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium">Ganhos Hoje</h3>
                <p className="text-3xl font-bold mt-2">€0,00</p>
                <p className="text-sm text-muted-foreground mt-1">Comissão: €0,00</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium">Ganhos esta Semana</h3>
                <p className="text-3xl font-bold mt-2">€0,00</p>
                <p className="text-sm text-muted-foreground mt-1">Comissão: €0,00</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium">Serviços Hoje</h3>
                <p className="text-3xl font-bold mt-2">0</p>
                <p className="text-sm text-muted-foreground mt-1">0 agendados</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Desempenho Semanal</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1a2b4b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Últimos Serviços</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Serviço</th>
                      <th className="text-right py-3 px-4">Valor</th>
                      <th className="text-right py-3 px-4">Comissão</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <ServiceEntry
              onServiceComplete={(service) => {
                console.log("Service completed:", service)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarberDashboard