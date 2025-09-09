"use client";

import { useState, useEffect } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

// Tipo de reserva (ajústalo según tu backend)
type Reservation = {
  code: string;
  name: string;
  surname: string;
  date: string;
  time: string;
  phoneNumber?: string;
  tableNumber?: number;
};

// Props que recibe la página
type ReservationPageProps = {
  params: {
    code: string;
  };
};

export default function ReservationPage({ params }: ReservationPageProps) {
  const [data, setData] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { code } = params;
        const res = await fetch(
          `http://localhost:8080/api/reservation/${code}`,
          {
            cache: "no-store",
          }
        );
        const json: Reservation = await res.json();

        if (!res.ok) throw new Error("No se encontró la reserva");

        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params]);

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!data) return null;

  const fecha = new Date(data.date);
  const fechaFormateada = fecha.toLocaleDateString("es-AR", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
           <div className="h-[95vh] text-white flex items-center justify-center px-5 bg-gradient-to-br from-black-900 via-neutral-950 to-black">
              <div className="bg-neutral-800/80 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-green-900">
                <h1 className="text-3xl font-extrabold text-white text-center">
                  Reserva Confirmada
                </h1>

                <div className="mt-6 space-y-3 text-lg">
                  <p>
                    <span className="font-semibold text-gray-300">Código:</span>
                    <span className="ml-2 text-green-500">{data.code}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Nombre:</span>
                    <span className="ml-2">
                      {data.name} {data.surname}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Fecha:</span>
                    <span className="ml-2">{fechaFormateada}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">Hora:</span>
                    <span className="ml-2">{data.time}</span>
                  </p>
                </div>
                <Link href="/dashboard" className="mt-8 inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Volver al dashboard
                </Link>
              </div>
              
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
