import express from "express";
import morgan from "morgan";
import cors from "cors";
import reservationRoutes from "./routes/reservation.routes.js";
import menuRoutes from "./routes/menu.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/reservation", reservationRoutes);
app.use("/api/menu", menuRoutes);

export default app;
