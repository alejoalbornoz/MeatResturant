import { Router } from "express";
import {
  createReservation,
  cancelReservation,
  getReservation,
  getAllReservations,
  deleteReservationController,
  fetchAvailableTables,
  updateReservationController,
  fetchReservationStats,
  availabilityController,
} from "../controllers/reservationController.js";

import { checkAvailability } from "../services/reservationService.js";

const router = Router();

router.post("/", createReservation);
router.get("/", getAllReservations);

router.get("/stats", fetchReservationStats);
router.get("/availability", checkAvailability);
router.get("/freetables", availabilityController);
router.get("/tables", fetchAvailableTables);
router.get("/:code", getReservation);

router.patch("/update/:code", updateReservationController);
router.patch("/cancel/:code", cancelReservation);
router.delete("/:code", deleteReservationController);

export default router;
