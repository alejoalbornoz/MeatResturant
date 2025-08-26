import { Router } from "express";
import {
  createReservation,
  cancelReservation,
  getReservation,
  getAllReservations,
  deleteReservationController,
} from "../controllers/reservationController.js";

import { checkAvailability } from "../services/reservationService.js";

const router = Router();

router.post("/", createReservation);
router.get("/", getAllReservations);
router.get("/availability", checkAvailability);

router.get("/:code", getReservation);
router.delete("/:code", deleteReservationController);
router.patch("/cancel/:code", cancelReservation);

export default router;
