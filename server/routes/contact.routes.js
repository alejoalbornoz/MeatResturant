import { Router } from "express";
import ContactController from "../controllers/contactController.js";
import {
  contactValidationRules,
  validate,
} from "../middlewares/validationEmail.js";

const router = Router();

router.get("/health", ContactController.healthCheck);

router.post(
  "/",
  contactValidationRules,
  validate,
  ContactController.sendContact
);

export default router;
