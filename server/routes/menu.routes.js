import { Router } from "express";
import {
  createMenuItem,
  deleteMenuItem,
  getMenuItems,
  updateMenuItem,
} from "../services/menu.js";

const router = Router();

router.get("/", getMenuItems);
router.post("/", createMenuItem);
router.patch("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
