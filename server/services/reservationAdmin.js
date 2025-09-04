import { PrismaClient } from "@prisma/client";
import { generateCode } from "../utils/generateCode.js";

const prisma = new PrismaClient();

export async function getAllReservationsCode() {
  // Limpiar reservas muy antiguas (90 días después de expiración)
  await prisma.reservation.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      },
    },
  });

  // Traer solo reservas que no expiraron
  return prisma.reservation.findMany({
    where: {
      expiresAt: { gte: new Date() },
    },
  });
}

export async function deleteReservationByCode(code) {
  if (!code) throw new Error("El código no ha sido proporcionado");

  try {
    const deletedReservation = await prisma.reservation.delete({
      where: { code },
    });
    return deletedReservation;
  } catch (error) {
    throw new Error("No se encontró una reserva con ese código");
  }
}

export async function updateReservation(code, updates, regenerateCode = false) {
  if (!code) throw new Error("El código original no ha sido proporcionado");

  // Construir objeto de actualización
  const dataToUpdate = {};

  if (updates.tableNumber) dataToUpdate.tableNumber = updates.tableNumber;
  if (updates.time) dataToUpdate.time = updates.time;
  if (updates.date) dataToUpdate.date = new Date(updates.date); // Asegurar tipo Date
  if (updates.phoneNumber) dataToUpdate.phoneNumber = updates.phoneNumber;
  if (updates.status) dataToUpdate.status = updates.status;
  if (updates.numberOfPeople)
    dataToUpdate.numberOfPeople = updates.numberOfPeople;

  // Generar nuevo código si se solicita
  if (regenerateCode) {
    dataToUpdate.code = generateCode();
  }

  if (Object.keys(dataToUpdate).length === 0) {
    throw new Error("No se proporcionaron datos para actualizar");
  }

  try {
    const updatedReservation = await prisma.reservation.update({
      where: { code },
      data: dataToUpdate,
    });

    return updatedReservation;
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("No se encontró ninguna reserva con ese código");
    }
    throw error;
  }
}

export async function getReservationStats(startDate, endDate) {
  const reservations = await prisma.reservation.groupBy({
    by: ["date"],
    _count: { id: true },
    where: {
      date: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return reservations.map((r) => ({
    date: r.date.toISOString().split("T")[0],
    count: r._count.id,
  }));
}
