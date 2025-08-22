"use client";
import { useState } from "react";

const Reservation = () => {
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [showReservaInput, setShowReservaInput] = useState(false);
  const [reservaCode, setReservaCode] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");

  const mesas = Array.from({ length: 16 }, (_, i) => ({ id: i + 1 }));

  const disponibilidad = {
    "2025-08-20": {
      "11:30": [1, 3],
      "12:00": [2, 5, 10],
      "12:30": [],
      "13:00": [7],
    },
    "2025-08-21": { "11:30": [1, 6, 8], "12:00": [3, 4], "12:30": [2] },
    "2025-08-22": { "11:30": [5, 9], "12:00": [] },
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const getAvailableTimes = () => {
    const times = [];
    let hour = 11;
    let minute = 30;
    while (hour < 23 || (hour === 23 && minute === 0)) {
      const h = hour.toString().padStart(2, "0");
      const m = minute.toString().padStart(2, "0");
      times.push(`${h}:${m}`);
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }
    return times;
  };

  const availableDates = getAvailableDates();
  const availableTimes = getAvailableTimes();

  const getMesasConEstado = (fechaSeleccionada, horaSeleccionada) => {
    const ocupadas =
      (disponibilidad[fechaSeleccionada] &&
        disponibilidad[fechaSeleccionada][horaSeleccionada]) ||
      [];
    return mesas.map((m) => ({
      ...m,
      ocupado: ocupadas.includes(m.id),
    }));
  };

  const mesasConEstado = getMesasConEstado(fecha, hora);

  const handleMesaClick = (mesaId) => {
    if (!mesasConEstado.find((m) => m.id === mesaId).ocupado) {
      setSelectedMesa(mesaId);
      setShowForm(true); // Mostrar formulario directo al elegir mesa
    }
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
            {mesasConEstado.map((mesa) => (
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log({
                  nombre,
                  apellido,
                  telefono,
                  mesa: selectedMesa,
                  fecha,
                  hora,
                });
              }}
              className="space-y-4"
            >
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
                type="tel"
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
          {/* Si el usuario ya tiene codigo */}
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
                <button className="bg-green-600 px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition">
                  Buscar Reserva
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
