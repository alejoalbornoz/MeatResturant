import express from "express";
import morgan from "morgan";
import cors from "cors";
import reservationRoutes from "./routes/reservation.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/reservation", reservationRoutes);

export default app;
