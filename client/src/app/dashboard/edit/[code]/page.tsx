"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function EditReservation() {
  type FormData = {
    name: string;
    surname: string;
    code: string;
    date: string;
    time: string;
    tableNumber: number;
    numberOfPeople: number;
    phoneNumber: string;
    status: string;
  };

  const { code } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    code: "",
    date: "",
    time: "",
    tableNumber: 0,
    numberOfPeople: 0,
    phoneNumber: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/reservation/${code}`
        );

        if (!res.ok) throw new Error("Error al traer la reserva");

        const data = await res.json();
        data.date = data.date.split("T")[0];

        setFormData(data);
      } catch (err) {
        console.log("Se generó un error inesperado:", err);
      } finally {
        setLoading(false);
      }
    };
    if (code) fetchReservation();
  }, [code]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      surname: formData.surname,
      tableNumber: Number(formData.tableNumber),
      numberOfPeople: Number(formData.numberOfPeople),
      phoneNumber: formData.phoneNumber,
      date: new Date(formData.date),
      time: formData.time,
      status: formData.status,
      regenerateCode: false,
    };

    console.log("Payload final enviado al backend:", payload);

    try {
      const res = await fetch(
        `http://localhost:8080/api/reservation/update/${code}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Error al actualizar la reserva: " + errorText);
      }

      const data = await res.json();
      console.log("Reserva actualizada:", data);
      showToast.success("¡La operación se realizó con éxito!", {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "popUp",
        icon: "",
        sound: false,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      showToast.error("¡La operación se realizó con éxito!", {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "popUp",
        icon: "",
        sound: false,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="container p-4 mx-auto mt-10">
            <div className="flex flex-col space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white">Editar Reserva</h1>
                <p className="text-gray-400 mt-2">Modifica los datos de la reserva</p>
              </div>

              <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle>Información de la Reserva</CardTitle>
                  <CardDescription>
                    Actualiza los detalles de la reserva a continuación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Nombre */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Ingrese el nombre"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Apellido */}
                      <div className="space-y-2">
                        <Label htmlFor="surname">Apellido</Label>
                        <Input
                          id="surname"
                          name="surname"
                          placeholder="Ingrese el apellido"
                          value={formData.surname}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Celular */}
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Celular</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Ingrese el número de celular"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Fecha y Hora */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">Fecha</Label>
                        <Input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Hora</Label>
                        <Input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Mesa y Personas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="tableNumber">Número de Mesa</Label>
                        <Input
                          type="number"
                          id="tableNumber"
                          name="tableNumber"
                          value={formData.tableNumber}
                          onChange={handleInputChange}
                          min="1"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numberOfPeople">Número de Personas</Label>
                        <Input
                          type="number"
                          id="numberOfPeople"
                          name="numberOfPeople"
                          value={formData.numberOfPeople}
                          onChange={handleInputChange}
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    {/* Estado */}
                    <div className="space-y-2">
                      <Label htmlFor="status">Estado</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => handleSelectChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Activa</SelectItem>
                          <SelectItem value="cancelled">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Código (solo lectura) */}
                    <div className="space-y-2">
                      <Label htmlFor="code">Código de Reserva</Label>
                      <Input
                        id="code"
                        value={formData.code}
                        readOnly
                        className="bg-muted text-muted-foreground"
                      />
                    </div>

                    {/* Botón */}
                    <div className="flex justify-end pt-4">
                      <Button type="submit" className="min-w-[150px]">
                        Guardar Cambios
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default EditReservation;