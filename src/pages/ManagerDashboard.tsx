import { useEffect, useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
}

interface Barber {
  id: string;
  name: string;
  services_count: number;
  rating: number;
}

const ManagerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [activeBarbers, setActiveBarbers] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch barbers
      const { data: barbersData, error: barbersError } = await supabase
        .from('barbers')
        .select('*');

      if (barbersError) throw barbersError;
      
      // Fetch today's revenue
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data: revenueData, error: revenueError } = await supabase
        .from('service_records')
        .select('price_charged')
        .gte('created_at', today.toISOString());

      if (revenueError) throw revenueError;

      // Calculate total revenue for today
      const todayTotalRevenue = revenueData?.reduce((acc, record) => acc + Number(record.price_charged), 0) || 0;

      // Update state with real data
      setBarbers(barbersData || []);
      setTodayRevenue(todayTotalRevenue);
      setActiveBarbers(barbersData?.length || 0);

      // For now, we'll keep products empty until we implement product management
      setProducts([]);
      setTotalProducts(0);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do dashboard.",
      });
    }
  };

  const handleExportReport = () => {
    // To be implemented
    toast({
      title: "Em desenvolvimento",
      description: "A exportação de relatórios será implementada em breve.",
    });
  };

  const handleAddProduct = () => {
    // To be implemented
    toast({
      title: "Em desenvolvimento",
      description: "A adição de produtos será implementada em breve.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Dashboard do Gerente</h1>
            <p className="text-muted-foreground">Gestão e Controle</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleExportReport}>Exportar Relatório</Button>
            <Button onClick={handleAddProduct}>Adicionar Produto</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium">Faturamento Hoje</h3>
            <p className="text-3xl font-bold mt-2">€{todayRevenue.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">Atualizado em tempo real</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium">Produtos em Estoque</h3>
            <p className="text-3xl font-bold mt-2">{totalProducts}</p>
            <p className="text-sm text-muted-foreground mt-1">Sistema em desenvolvimento</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium">Barbeiros Ativos</h3>
            <p className="text-3xl font-bold mt-2">{activeBarbers}</p>
            <p className="text-sm text-muted-foreground mt-1">Total registrado</p>
          </Card>
        </div>

        <Tabs defaultValue="barbers" className="w-full">
          <TabsList>
            <TabsTrigger value="barbers">Barbeiros</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="barbers">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Barbeiro</TableHead>
                    <TableHead className="text-right">Serviços</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barbers.map((barber) => (
                    <TableRow key={barber.id}>
                      <TableCell>{barber.name}</TableCell>
                      <TableCell className="text-right">
                        {barber.services_count || 0}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Detalhes</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
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
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-right">€{product.price}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        Sistema de produtos em desenvolvimento
                      </TableCell>
                    </TableRow>
                  )}
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
