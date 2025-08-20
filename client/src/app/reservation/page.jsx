"use client";
import { useState } from "react";

const Reservation = () => {
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [showReservaInput, setShowReservaInput] = useState(false);
  const [reservaCode, setReservaCode] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  // Simulación de mesas disponibles (id, estado)
  const mesas = [
    { id: 1, ocupado: false },
    { id: 2, ocupado: true },
    { id: 3, ocupado: false },
    { id: 4, ocupado: false },
    { id: 5, ocupado: true },
    { id: 6, ocupado: false },
    { id: 7, ocupado: false },
    { id: 8, ocupado: false },
    { id: 9, ocupado: false },
    { id: 10, ocupado: true },
    { id: 11, ocupado: false },
    { id: 12, ocupado: false },
    { id: 13, ocupado: true },
    { id: 14, ocupado: false },
    { id: 15, ocupado: false },
    { id: 16, ocupado: false },
  ];

  const handleMesaClick = (mesaId) => {
    if (!mesas.find((m) => m.id === mesaId).ocupado) {
      setSelectedMesa(mesaId);
    }
  };

  return (
    <div className="h-screen bg-[#070608] text-white flex flex-col items-center justify-center px-5">
      <h1 className="text-3xl font-bold mb-6">Reservá tu mesa 🍷🥩</h1>

      {/* Fecha y hora */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>

      {/* Plano de mesas */}
      <div className="grid grid-cols-6 gap-6 bg-neutral-900 p-6 rounded-2xl shadow-lg mb-8">
        {mesas.map((mesa) => (
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
      <button className="bg-green-600 px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition">
        Reservar Mesa
      </button>

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
              onChange={(e) => setCodigoReserva(e.target.value)}
              placeholder="Código de reserva"
              className="px-4 py-2 rounded-lg text-black bg-white  w-64"
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
