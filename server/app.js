import express from "express";
import morgan from "morgan";
import cors from "cors";
import reservationRoutes from "./routes/reservation.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

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
  console.error("Error no manejado:", error);

  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

export default app;
