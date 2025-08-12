import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(morgan("dev"));
app.use(cors());
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}/`);
});

app.get("/api/home", (req, res) => {
  res.json({ message: "Hola mundo" });
});
