 "use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable, schema } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { z } from "zod";

type Reservation = z.infer<typeof schema>;

export default function Dashboard() {
  const [reservations, setReservations] = useState<z.infer<typeof schema>[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/reservation/", {
          credentials: "include",
        });
        const data = await res.json();

        // Adaptamos los datos al schema
        const mapped: Reservation[] = data.map((r) => ({
          ...r,
          tableNumber: r.tableNumber.toString(),
          date: new Date(r.date).toLocaleDateString(),
          regenerateCode: "",
        }));
        setReservations(mapped);
      } catch (err) {
        console.error("Error cargando reservas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <p>Cargando reservas...</p>;

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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DataTable data={reservations} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
