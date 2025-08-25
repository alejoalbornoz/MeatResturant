import { generateCode } from "../utils/generateCode.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createReservation(data) {
  const code = generateCode();
  const expiresAt = new Date(data.date);
  expiresAt.setDate(expiresAt.getDate() + 1);

  return await prisma.reservation.create({
    data: {
      ...data,
      code,
      expiresAt,
    },
  });
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
