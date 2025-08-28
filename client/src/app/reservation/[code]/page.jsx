"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { showToast } from "nextjs-toast-notify";

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
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (res.ok) {
        showToast.success("¡Cancelaste tu reserva con éxito!", {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: false,
        });
        router.push("/");
      } else {
        const errorData = await res.json();
        console.log(errorData.error);
        showToast.error("¡Error al cancelar la reserva!", {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: "",
          sound: false,
        });
      }
    } catch (error) {
      console.error(error);
      showToast.error("¡No se pudo cancelar la reserva!", {
        duration: 4000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: "",
        sound: false,
      });
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
              className="bg-red-600 p-2 rounded-md mt-5 cursor-pointer font-bold"
            >
              Cancelar Reserva
            </button>
            <Link
              href="/menu"
              className="bg-amber-600 p-2 rounded-md ml-2 cursor-pointer font-bold"
            >
              Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
