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
    <div className="h-screen text-white flex items-center justify-center px-5 bg-gradient-to-br from-black-900 via-neutral-950 to-black">
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

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={cancelReservation}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold transition duration-200 cursor-pointer"
          >
            Cancelar Reserva
          </button>
          <Link
            href="/menu"
            className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg font-bold transition duration-200"
          >
            Menú
          </Link>
        </div>
      </div>
    </div>
  );
}
