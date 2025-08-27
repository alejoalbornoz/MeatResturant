import { Router } from "express";
import {
  createReservation,
  cancelReservation,
  getReservation,
  getAllReservations,
  deleteReservationController,
  fetchAvailableTables,
} from "../controllers/reservationController.js";

import { checkAvailability } from "../services/reservationService.js";

const router = Router();

router.post("/", createReservation);
router.get("/", getAllReservations);
router.get("/availability", checkAvailability);
router.get("/tables", fetchAvailableTables);

router.get("/:code", getReservation);
router.delete("/:code", deleteReservationController);
router.patch("/cancel/:code", cancelReservation);

export default router;
