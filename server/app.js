import express from "express";
import morgan from "morgan";
import cors from "cors";
import reservationRoutes from "./routes/reservation.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/reservation", reservationRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/contact", contactRoutes);

// Ruta de health check básica
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// Manejo de errores global
app.use((error, req, res, next) => {
  // Manejar errores de Multer
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: "El archivo es demasiado grande (máximo 5MB)"
      });
    }
  }
  
  console.error("Error no manejado:", error);

  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

export default app;