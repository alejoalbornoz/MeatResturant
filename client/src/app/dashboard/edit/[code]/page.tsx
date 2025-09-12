"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showToast } from "nextjs-toast-notify";


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

    // 🔹 Creamos un payload limpio solo con los campos que el backend acepta
    const payload = {
      name: formData.name,
      surname: formData.surname,
      tableNumber: Number(formData.tableNumber),
      numberOfPeople: Number(formData.numberOfPeople),
      phoneNumber: formData.phoneNumber,
      date: new Date(formData.date),
      time: formData.time,
      status: formData.status,
      regenerateCode: false, // o true si quieres regenerar el código
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };



  return (
    <div>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="container p-4 mx-auto mt-10">
            <h1 className="flex justify-center items-center text-3xl font-bold text-white mb-8">
              Editar Reservas
            </h1>

            <div className="bg-zinc-800 w-full max-w-3xl mx-auto p-8 rounded-3xl shadow-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Ingrese el nombre"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Apellido */}
                <div>
                  <label
                    htmlFor="surname"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Ingrese el apellido"
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </div>

                {/* Celular */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Celular
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Ingrese el número de celular"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* Fecha y Hora */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Fecha
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Hora
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      value={formData.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Mesa y Personas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="tableNumber"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Mesa
                    </label>
                    <input
                      type="number"
                      id="tableNumber"
                      name="tableNumber"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      value={formData.tableNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="numberOfPeople"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Personas
                    </label>
                    <input
                      type="number"
                      id="numberOfPeople"
                      name="numberOfPeople"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      value={formData.numberOfPeople}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Estado
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Código */}
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Código
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="w-full rounded-xl bg-zinc-700 border border-zinc-600 p-3 text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    id="code"
                    value={formData.code}
                  />
                </div>

                {/* Botón */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-medium transition"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default EditReservation;
