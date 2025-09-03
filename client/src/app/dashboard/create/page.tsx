"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Reservation from "../../reservation/page";

export default function CreateDashboard() {
  return (
    <SidebarProvider
      style={
        {

        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col h-max-[100vh]">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Reservation />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
