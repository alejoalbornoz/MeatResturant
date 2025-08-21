"use client";
import { useState } from "react";

const Reservation = () => {
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [showReservaInput, setShowReservaInput] = useState(false);
  const [reservaCode, setReservaCode] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  // Nuevo estado para mostrar formulario
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
      setShowForm(false);
    }
  };

  return (
    <div className="h-screen bg-[#070608] text-white flex flex-col items-center justify-center px-5">
      <h1 className="text-3xl font-bold mb-6">Reservá tu mesa 🍷🥩</h1>

      {/* Selectores de fecha y hora */}
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

      {/* Plano de mesas */}
      <div className="grid grid-cols-6 gap-6 bg-neutral-900 p-6 rounded-2xl shadow-lg mb-8">
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

      {/* Resumen */}
      {selectedMesa && (
        <div className="mb-6 text-center">
          <p className="text-lg">
            Mesa seleccionada:{" "}
            <span className="font-bold text-green-400">{selectedMesa}</span>
          </p>
          <p className="text-sm text-gray-400">
            {fecha && hora
              ? `Fecha: ${fecha} | Hora: ${hora}`
              : "Seleccioná fecha y hora"}
          </p>
        </div>
      )}

      {/* Botón para mostrar formulario */}
      {selectedMesa && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition"
        >
          Reservar Mesa
        </button>
      )}

      {/* Formulario */}
      {showForm && (
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
          className="mt-6 bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">Datos de la reserva</h2>
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
            className="bg-green-600 px-6 py-2 cursor-pointer rounded-lg hover:bg-green-700 transition w-full"
          >
            Confirmar Reserva
          </button>
        </form>
      )}

      {/* Código de reserva existente */}
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
  );
};

export default Reservation;
