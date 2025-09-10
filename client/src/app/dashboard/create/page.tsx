"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

type Table = {
  id: number;
  name: string;
};

type Reservation = {
  code: string;
  tableNumber: number;
  date: string;
  time: string;
  name: string;
  surname: string;
  phoneNumber: string;
};

export default function CreateDashboard() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [tables, setTables] = useState<Table[]>([]);
  const [occupiedTables, setOccupiedTables] = useState<number[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/reservation/tables");
        const data = await res.json();
        setAvailableDates(data.dates || []);
        setAvailableTimes(data.times || []);
      } catch (error) {
        console.error("Error fetching dates and times:", error);
      }
    };

    fetchSlots();
  }, []);

  useEffect(() => {
    setTables(
      Array.from({ length: 16 }, (_, i) => ({
        id: i + 1,
        name: `Table ${i + 1}`,
      }))
    );
  }, []);

  useEffect(() => {
    if (!date || !time) return;

    const fetchAvailability = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/reservation/availability?date=${date}&time=${time}`
        );
        const data = await res.json();
        setOccupiedTables(data.occupiedTables || []);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, [date, time]);

  const getStatusTables = () => {
    return tables.map((t) => ({
      ...t,
      occupied: occupiedTables.includes(t.id),
    }));
  };

  const createReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) return;

    const reservationData = {
      tableNumber: selectedTable,
      date,
      time,
      name,
      surname,
      phoneNumber,
      numberOfPeople,
    };

    try {
      const res = await fetch("http://localhost:8080/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      const data: { code: string; error?: string } = await res.json();
      if (res.ok) {
        console.log(`Reservation created. Code: ${data.code}`);
        router.push(`/dashboard/${data.code}`);
      } else {
        console.log(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      showToast.error("Error creating reservation!", {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: "",
        sound: false,
      });
    }
  };


  const handleTableClick = (id: number) => {
    setSelectedTable(id);
    setShowForm(true);
  };

  return (
    <SidebarProvider style={{} as React.CSSProperties}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col h-max-[100vh]">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="h-screen bg-[#070608] text-white flex flex-col items-center justify-center px-5">
              <h1 className="text-3xl font-bold mb-6">Reserva tu mesa 🍷🥩</h1>

              <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl bg-neutral-900 p-6 rounded-2xl shadow-lg">
                {/* Sección de selección de fecha/hora */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <select
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setSelectedTable(null);
                        setShowForm(false);
                      }}
                      className="p-2 rounded bg-gray-800 border border-gray-700"
                    >
                      <option value="">Seleccioná fecha</option>
                      {availableDates.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>

                    <select
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                        setSelectedTable(null);
                        setShowForm(false);
                      }}
                      className="p-2 rounded bg-gray-800 border border-gray-700"
                    >
                      <option value="">Seleccioná hora</option>
                      {availableTimes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mesas */}
                  <div className="grid grid-cols-4 gap-4">
                    {getStatusTables().map((table) => (
                      <button
                        key={table.id}
                        onClick={() => handleTableClick(table.id)}
                        disabled={table.occupied}
                        className={`w-16 h-16 flex items-center justify-center rounded-full font-bold transition
                          ${
                            table.occupied
                              ? "bg-red-600 cursor-not-allowed"
                              : selectedTable === table.id
                              ? "bg-green-500"
                              : "bg-gray-700 hover:bg-green-600"
                          }`}
                      >
                        {table.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Formulario de reserva */}
                <div className="flex-1 bg-neutral-800 p-6 rounded-lg">
                  {showForm ? (
                    <form onSubmit={createReservation} className="space-y-4">
                      <h2 className="text-xl font-bold mb-4">
                        Datos de la reserva
                      </h2>
                      <p className="text-sm text-gray-400 mb-2">
                        Mesa: {selectedTable} | Fecha: {date} | Hora: {time}
                      </p>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre"
                        className="w-full px-4 py-2 rounded mb-3 text-white"
                        required
                      />
                      <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Apellido"
                        className="w-full px-4 py-2 rounded mb-3 text-white"
                        required
                      />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Teléfono"
                        className="w-full px-4 py-2 rounded mb-3 text-white"
                        required
                      />
                      <p className="w-full px-4 py-2 rounded mb-3 text-gray-400">
                        Numero de personas:
                        <input
                          type="number"
                          value={numberOfPeople}
                          onChange={(e) =>
                            setNumberOfPeople(parseInt(e.target.value, 10))
                          }
                          className="w-20 px-4 py-2 rounded mb-3 text-white border-1 ml-4 border-gray-400"
                          min={1}
                          max={15}
                        />
                      </p>
                      <button
                        type="submit"
                        className="bg-green-600 px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition w-full"
                      >
                        Confirmar Reserva
                      </button>
                    </form>
                  ) : (
                    <p className="text-gray-400  text-center">
                      Selecciona una mesa para continuar.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
