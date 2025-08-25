import { Router } from "express";
import {
  createReservation,
  cancelReservation,
  getReservation,
  getAllReservations,
} from "../controllers/reservationController.js";

const router = Router();

router.post("/", createReservation);
router.get("/", getAllReservations);
router.get("/:code", getReservation);
router.patch("/cancel/:code", cancelReservation);

export default router;
