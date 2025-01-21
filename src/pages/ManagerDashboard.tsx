import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockProducts = [
  { id: 1, name: "Pomada Modeladora", stock: 15, price: 25 },
  { id: 2, name: "Óleo para Barba", stock: 8, price: 30 },
  { id: 3, name: "Shampoo Especial", stock: 12, price: 20 },
];

const mockBarbers = [
  { id: 1, name: "João Silva", services: 145, rating: 4.8 },
  { id: 2, name: "Miguel Santos", services: 132, rating: 4.7 },
  { id: 3, name: "Pedro Costa", services: 128, rating: 4.9 },
];

const ManagerDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Dashboard do Gerente</h1>
            <p className="text-muted-foreground">Gestão e Controle</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">Exportar Relatório</Button>
            <Button>Adicionar Produto</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium">Faturamento Hoje</h3>
            <p className="text-3xl font-bold mt-2">€850,00</p>
            <p className="text-sm text-muted-foreground mt-1">+15% vs. ontem</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium">Produtos em Estoque</h3>
            <p className="text-3xl font-bold mt-2">35</p>
            <p className="text-sm text-muted-foreground mt-1">3 precisam reposição</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium">Barbeiros Ativos</h3>
            <p className="text-3xl font-bold mt-2">6</p>
            <p className="text-sm text-muted-foreground mt-1">2 em serviço agora</p>
          </Card>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="barbers">Barbeiros</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Estoque</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-right">€{product.price}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="barbers">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Barbeiro</TableHead>
                    <TableHead className="text-right">Serviços</TableHead>
                    <TableHead className="text-right">Avaliação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBarbers.map((barber) => (
                    <TableRow key={barber.id}>
                      <TableCell>{barber.name}</TableCell>
                      <TableCell className="text-right">{barber.services}</TableCell>
                      <TableCell className="text-right">{barber.rating}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Detalhes</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;