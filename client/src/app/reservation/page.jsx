"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

export default function Reservation() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tables, setTables] = useState([]);
  const [occupiedTables, setOccupiedTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [reservationCode, setReservationCode] = useState("");
  const [showReservationInput, setShowReservationInput] = useState(false);
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

  const createReservation = async (e) => {
    e.preventDefault();
    const reservationData = {
      tableNumber: selectedTable,
      date: date,
      time: time,
      name: name,
      surname: surname,
      phoneNumber: phoneNumber,
      numberOfPeople: numberOfPeople,
    };

    try {
      const res = await fetch("http://localhost:8080/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`Reservation created. Code: ${data.code}`);
        router.push(`/reservation/${data.code}`);
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

  const searchReservation = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/reservation/${reservationCode}`
      );
      const data = await res.json();
      if (res.ok) {
        console.log(
          `Reservation found: Table ${data.tableNumber} Name: ${data.name} ${data.surname}, Date: ${data.date}, Time: ${data.time}`
        );
        router.push(`/reservation/${data.code}`);
      } else {
        console.log(`Error: ${data.error}`);
        showToast.error("Code not found!", {
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
    }
  };

  const handleTableClick = (id) => {
    setSelectedTable(id);
    setShowForm(true);
  };

  return (
    <div className="h-screen bg-[#070608] text-white flex flex-col items-center justify-center px-5">
      <h1 className="text-3xl font-bold mb-6">Reserva tu mesa 🍷🥩</h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl bg-neutral-900 p-6 rounded-2xl shadow-lg">
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

        <div className="flex-1 bg-neutral-800 p-6 rounded-lg">
          {showForm ? (
            <form onSubmit={createReservation} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Datos de la reserva</h2>
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
                type="int"
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
                  min="1"
                  max="15"
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
            <p className="text-gray-400">Selecciona una mesa para continuar.</p>
          )}

          <div className="mt-6 w-full max-w-md text-center">
            <div className="flex items-center justify-center gap-4">
              <p className="text-lg">¿Ya tenés una reserva?</p>
              <button
                onClick={() => setShowReservationInput(!showReservationInput)}
                className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                {showReservationInput ? "Cerrar" : "Ingresar código"}
              </button>
            </div>
            {showReservationInput && (
              <div className="mt-4 flex flex-col gap-3 items-center">
                <input
                  type="text"
                  value={reservationCode}
                  onChange={(e) => setReservationCode(e.target.value)}
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
