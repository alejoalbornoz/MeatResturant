import {
  createReservation as createReservationService,
  cancelReservation as cancelReservationService,
  getReservationByCode,
} from "../services/reservationService.js";

import {
  getAllReservationsCode,
  deleteReservationByCode,
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
    const updatedRes = await cancelReservationService(code);
    res.status(200).json(updatedRes);
  } catch (err) {
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
