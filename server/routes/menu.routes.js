import { Router } from "express";
import {
  createCategory,
  createMenuItem,
  deleteMenuItem,
  getCategory,
  getMenuItems,
  getUniqueMenuItems,
  updateCategory,
  updateMenuItem,
} from "../services/menu.js";

const router = Router();

router.get("/", getMenuItems);
router.get("/category", getCategory);
router.post("/", createMenuItem);
router.post("/category", createCategory);
router.patch("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.get("/:id", getUniqueMenuItems);
router.patch("/category/:id", updateCategory);

export default router;
