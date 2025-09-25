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
import upload from "../config/multerConfig.js";

const router = Router();

// Rutas que manejan imágenes
router.post("/", upload.single('image'), createMenuItem); // POST /api/menu/
router.patch("/:id", upload.single('image'), updateMenuItem); // PATCH /api/menu/:id

// Rutas que NO manejan imágenes (mantienen igual)
router.get("/", getMenuItems);
router.get("/category", getCategory);
router.post("/category", createCategory);
router.delete("/:id", deleteMenuItem);
router.get("/:id", getUniqueMenuItems);
router.patch("/category/:id", updateCategory);

export default router;