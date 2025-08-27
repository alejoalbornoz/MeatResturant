"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Reserva() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [mesas, setMesas] = useState([]);
  const [ocupadas, setOcupadas] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [reservaCode, setReservaCode] = useState("");
  const [showReservaInput, setShowReservaInput] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/reservation/tables");
        const data = await res.json();
        
        setAvailableDates(data.dates || []);
        setAvailableTimes(data.times || []);
      } catch (error) {
        console.error("Error al obtener fechas y horarios:", error);
      }
    };

    fetchSlots();
  }, []);

  // Simula las mesas fijas del restaurante
  useEffect(() => {
    setMesas(
      Array.from({ length: 16 }, (_, i) => ({
        id: i + 1,
        nombre: `Mesa ${i + 1}`,
      }))
    );
  }, []);

  // Trae disponibilidad desde backend cuando cambian fecha u hora
  useEffect(() => {
    if (!fecha || !hora) return;

    const fetchDisponibilidad = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/reservation/availability?date=${fecha}&time=${hora}`
        );
        const data = await res.json();
        setOcupadas(data.occupiedTables || []);
      } catch (error) {
        console.error("Error al obtener disponibilidad:", error);
      }
    };

    fetchDisponibilidad();
  }, [fecha, hora]);

  // Obtiene estado de mesas (ocupadas o no)
  const getStatusTables = () => {
    return mesas.map((m) => ({
      ...m,
      ocupado: ocupadas.includes(m.id),
    }));
  };

  // Crear reserva
  const createReservation = async (e) => {
    e.preventDefault();
    const reservaData = {
      tableNumber: selectedMesa,
      date: fecha,
      time: hora,
      name: nombre,
      surname: apellido,
      phoneNumber: telefono,
    };

    try {
      const res = await fetch("http://localhost:8080/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservaData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`Reserva creada. Código: ${data.code}`);
        router.push(`/reservation/${data.code}`);
      } else {
        console.log(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear reserva");
    }
  };

  // Buscar reserva
  const searchReservation = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/reservation/${reservaCode}`
      );
      const data = await res.json();
      if (res.ok) {
        console.log(
          `Reserva encontrada: Mesa ${data.tableNumber} A nombre de: ${data.name} ${data.surname}, Fecha: ${data.date}, Hora: ${data.time}`
        );
        router.push(`/reservation/${data.code}`);
      } else {
        console.log(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMesaClick = (id) => {
    setSelectedMesa(id);
    setShowForm(true);
  };

  return (
    <div className="h-screen bg-[#070608] text-white flex flex-col items-center justify-center px-5">
      <h1 className="text-3xl font-bold mb-6">Reservá tu mesa 🍷🥩</h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl bg-neutral-900 p-6 rounded-2xl shadow-lg">
        {/* Columna Izquierda - Selección */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
              value={fecha}
              onChange={(e) => {
                setFecha(e.target.value);
                setSelectedMesa(null);
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
              value={hora}
              onChange={(e) => {
                setHora(e.target.value);
                setSelectedMesa(null);
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

          <div className="grid grid-cols-4 gap-4">
            {getStatusTables().map((mesa) => (
              <button
                key={mesa.id}
                onClick={() => handleMesaClick(mesa.id)}
                disabled={mesa.ocupado}
                className={`w-16 h-16 flex items-center justify-center rounded-full font-bold transition
                  ${
                    mesa.ocupado
                      ? "bg-red-600 cursor-not-allowed"
                      : selectedMesa === mesa.id
                      ? "bg-green-500"
                      : "bg-gray-700 hover:bg-green-600"
                  }`}
              >
                {mesa.id}
              </button>
            ))}
          </div>
        </div>

        {/* Columna Derecha - Formulario */}
        <div className="flex-1 bg-neutral-800 p-6 rounded-lg">
          {showForm ? (
            <form onSubmit={createReservation} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Datos de la reserva</h2>
              <p className="text-sm text-gray-400 mb-2">
                Mesa: {selectedMesa} | Fecha: {fecha} | Hora: {hora}
              </p>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                className="w-full px-4 py-2 rounded mb-3 text-white"
                required
              />
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apellido"
                className="w-full px-4 py-2 rounded mb-3 text-white"
                required
              />
              <input
                type="int"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono"
                className="w-full px-4 py-2 rounded mb-3 text-white"
                required
              />
              <button
                type="submit"
                className="bg-green-600 px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition w-full"
              >
                Confirmar Reserva
              </button>
            </form>
          ) : (
            <p className="text-gray-400">Selecciona una mesa para continuar.</p>
          )}

          {/* Si el usuario ya tiene código */}
          <div className="mt-6 w-full max-w-md text-center">
            <div className="flex items-center justify-center gap-4">
              <p className="text-lg">¿Ya tenés una reserva?</p>
              <button
                onClick={() => setShowReservaInput(!showReservaInput)}
                className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                {showReservaInput ? "Cerrar" : "Ingresar código"}
              </button>
            </div>
            {showReservaInput && (
              <div className="mt-4 flex flex-col gap-3 items-center">
                <input
                  type="text"
                  value={reservaCode}
                  onChange={(e) => setReservaCode(e.target.value)}
                  placeholder="Código de reserva"
                  className="px-4 py-2 rounded-lg text-black bg-white w-64"
                />
                <button
                  onClick={searchReservation}
                  className="bg-green-600 px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition"
                >
                  Buscar Reserva
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
