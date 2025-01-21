import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"

const serviceTypes = [
  { id: "haircut", name: "Corte Masculino", basePrice: 35 },
  { id: "beard", name: "Barba", basePrice: 25 },
  { id: "combo", name: "Corte + Barba", basePrice: 55 },
  { id: "hair-design", name: "Design Cabelo", basePrice: 45 },
  { id: "beard-design", name: "Design Barba", basePrice: 35 },
]

interface ServiceEntryProps {
  onServiceComplete?: (service: any) => void
}

export function ServiceEntry({ onServiceComplete }: ServiceEntryProps) {
  const [selectedService, setSelectedService] = useState("")
  const [clientName, setClientName] = useState("")
  const [duration, setDuration] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedService || !clientName) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor preencha todos os campos obrigatórios.",
      })
      return
    }

    const serviceDetails = {
      type: selectedService,
      clientName,
      duration: Number(duration) || 30,
      notes,
      timestamp: new Date().toISOString(),
      price: serviceTypes.find(s => s.id === selectedService)?.basePrice || 0,
    }

    try {
      // Here we'll add the database integration later
      console.log("Service recorded:", serviceDetails)
      
      toast({
        title: "Serviço registrado com sucesso!",
        description: `${serviceTypes.find(s => s.id === selectedService)?.name} para ${clientName}`,
      })

      // Reset form
      setSelectedService("")
      setClientName("")
      setDuration("")
      setNotes("")

      if (onServiceComplete) {
        onServiceComplete(serviceDetails)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao registrar serviço",
        description: "Por favor tente novamente.",
      })
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="service-type">Tipo de Serviço</Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger id="service-type">
              <SelectValue placeholder="Selecione o serviço" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name} - €{service.basePrice}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="client-name">Nome do Cliente</Label>
          <Input
            id="client-name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Nome do cliente"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duração (minutos)</Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="30"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Observações</Label>
          <Input
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Observações adicionais"
          />
        </div>

        <Button type="submit" className="w-full">
          Registrar Serviço
        </Button>
      </form>
    </Card>
  )
}