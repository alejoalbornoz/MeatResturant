import {
  createReservation as createReservationService,
  cancelReservation as cancelReservationService,
  getReservationByCode,
  getAvailableTables,
} from "../services/reservationService.js";

import {
  getAllReservationsCode,
  deleteReservationByCode,
  updateReservation,
  getReservationStats,
} from "../services/reservationAdmin.js";

export async function createReservation(req, res) {
  try {
    const newRes = await createReservationService(req.body);
    res.status(201).json(newRes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function cancelReservation(req, res) {
  try {
    const { code } = req.params;
    console.log("Cancel request received for code:", code);

    const updatedRes = await cancelReservationService(code);
    console.log("Service response:", updatedRes);

    res.status(200).json(updatedRes);
  } catch (err) {
    console.error("Cancel error:", err.message);
    res.status(400).json({ error: err.message });
  }
}

export async function getReservation(req, res) {
  try {
    const { code } = req.params;
    const reservation = await getReservationByCode(code);
    if (!reservation) return res.status(404).json({ error: "No encontrada" });
    res.status(200).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllReservations(req, res) {
  try {
    const reservations = await getAllReservationsCode();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error al cargar las reservas", error });
  }
}

export async function deleteReservationController(req, res) {
  const { code } = req.params;
  try {
    const deleted = await deleteReservationByCode(code);
    res.json({ message: "Reserva eliminada correctamente", deleted });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const fetchAvailableTables = async (req, res) => {
  try {
    const slots = await getAvailableTables();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function updateReservationController(req, res) {
  const { code } = req.params;

  let {
    name,
    surname,
    tableNumber,
    time,
    date,
    phoneNumber,
    status,
    numberOfPeople,
    regenerateCode,
  } = req.body;

  tableNumber = Number(tableNumber);
  numberOfPeople = Number(numberOfPeople);

  try {
    const updated = await updateReservation(
      code,
      {
        name,
        surname,
        tableNumber,
        time,
        date,
        phoneNumber,
        status,
        numberOfPeople,
      },
      regenerateCode
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function fetchReservationStats(req, res) {
  const { startDate, endDate } = req.query;

  try {
    const stats = await getReservationStats(startDate, endDate);
    res.json(stats);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener estadísticas de reservas" });
  }
}
