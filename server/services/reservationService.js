import { generateCode } from "../utils/generateCode.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createReservation(data) {
  const { tableNumber, date, time, name, surname, phoneNumber } = data;

  const reservationDate = new Date(date); // Conversión a Date

  // Verificar si ya existe una reserva activa
  const existingReservation = await prisma.reservation.findFirst({
    where: {
      tableNumber,
      date: reservationDate,
      time,
      status: "active",
    },
  });

  if (existingReservation) {
    throw new Error("La mesa ya está reservada para esta fecha y hora");
  }

  // Generar código único
  const code = generateCode();

  // Calcular expiración
  const expiresAt = new Date(reservationDate);
  expiresAt.setDate(expiresAt.getDate() + 1);

  return await prisma.reservation.create({
    data: {
      tableNumber,
      date: reservationDate,
      time,
      name,
      surname,
      phoneNumber,
      code,
      expiresAt,
      status: "active",
    },
  });
}

export async function getAvailableTables() {
  const today = new Date();

  // Generar los próximos 7 días
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  // Generar horarios de 11:00 a 23:00
  const times = [];
  for (let hour = 11; hour <= 23; hour++) {
    const formattedHour = hour.toString().padStart(2, "0") + ":00";
    times.push(formattedHour);
  }

  return { dates, times };
}

export async function checkAvailability(req, res) {
  const { date, time } = req.query;
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        date: new Date(date),
        time,
        status: "active",
      },
      select: { tableNumber: true },
    });

    const occupiedTables = reservations.map((r) => r.tableNumber);
    res.json({ occupiedTables });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function cancelReservation(code) {
  const reservation = await prisma.reservation.findUnique({ where: { code } });
  if (!reservation) throw new Error("Reserva no encontrada");

  const now = new Date();
  const diffHours = (reservation.date - now) / 36e5;

  if (diffHours < 5)
    throw new Error("No se puede cancelar con menos de 5 horas");

  return prisma.reservation.update({
    where: { code },
    data: { status: "cancelled" },
  });
}

export async function getReservationByCode(code) {
  return prisma.reservation.findUnique({ where: { code } });
}
