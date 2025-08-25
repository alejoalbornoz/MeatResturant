import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllReservationsCode() {
  return prisma.reservation.findMany();
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
