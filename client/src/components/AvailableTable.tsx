// components/AvailableTables.tsx
"use client";

import { useEffect, useState } from "react";

type Availability = {
  [date: string]: {
    [time: string]: {
      availableTables: number[];
      occupiedTables: number[];
    };
  };
};

export default function AvailableTables() {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/reservation/freetables"); // ajustá la URL a tu ruta real
        const data = await res.json();
        setAvailability(data);
        setSelectedDate(Object.keys(data)[0]); // arranca con el primer día
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-lg">Cargando mesas...</p>;
  }

  if (!availability) {
    return <p className="text-center py-10 text-red-500">Error cargando datos</p>;
  }

  const dates = Object.keys(availability);

  return (
    <div className="w-full space-y-6 mt-10">
      {/* Selector de fecha */}
      <div className="flex flex-wrap gap-2 justify-center">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`px-4 py-2 rounded-xl text-sm transition-colors 
              ${
                selectedDate === date
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
          >
            {new Date(date).toLocaleDateString("es-AR", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
            })}
          </button>
        ))}
      </div>

      {/* Tabla de horarios y mesas */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-border rounded-xl">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left">Hora</th>
              <th className="px-4 py-2 text-left">Mesas libres</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(availability[selectedDate] || {}).map(
              ([time, { availableTables }]) => (
                <tr key={time} className="border-t border-border">
                  <td className="px-4 py-2">{time}</td>
                  <td className="px-4 py-2">
                    {availableTables.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {availableTables.map((table) => (
                          <span
                            key={table}
                            className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium"
                          >
                            Mesa {table}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-red-500">Sin mesas</span>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
