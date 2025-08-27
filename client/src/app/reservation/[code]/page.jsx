"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ReservationPage({ params }) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { code } = await params;
        const res = await fetch(
          `http://localhost:8080/api/reservation/${code}`,
          {
            cache: "no-store",
          }
        );
        const json = await res.json();

        if (!res.ok) throw new Error("No se encontró la reserva");

        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params]);

  const cancelReservation = async () => {
    if (!data) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/reservation/cancel/${data.code}`,
        { method: "PATCH" }
      );

      if (res.ok) {
        alert("Reserva cancelada correctamente.");
        router.push("/"); 
      } else {
        alert("Error al cancelar la reserva");
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo cancelar la reserva");
    }
  };

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
    <div className="h-screen text-white flex flex-col items-center justify-center px-5">
      <div className="bg-gray-800 p-15 rounded-3xl">
        <h1 className="text-2xl font-bold">Reserva Confirmada</h1>
        <div className="mt-4 space-y-2 text-white text-2xl">
          <p>
            <strong>Código:</strong> {data.code}
          </p>
          <p>
            <strong>Nombre:</strong> {data.name} {data.surname}
          </p>
          <p>
            <strong>Fecha:</strong> {fechaFormateada}
          </p>
          <p>
            <strong>Hora:</strong> {data.time}
          </p>
          <div className="text-[20px]">
            <button
              onClick={cancelReservation}
              className="bg-red-600 p-2 rounded-md mt-5 cursor-pointer"
            >
              Cancelar Reserva
            </button>
            <Link
              href="/menu"
              className="bg-amber-600 p-2 rounded-md ml-2 cursor-pointer"
            >
              Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
