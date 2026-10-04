import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./src/routes/index.js";
import authRouter from "./src/routes/auth.js";   

const app = express();

// <-- refuse to start without a secret
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing from .env -- the API cannot sign tokens.");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);       
app.use("/api", router);

// Central Error Handling Middleware (must be LAST app.use)
app.use((err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ error: err.errors.map((e) => e.message) });
  }
  if (err.name === "SequelizeUniqueConstraintError") {   // <-- add (4)
    return res.status(409).json({ error: "That email is already registered" });
  }
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

// Server Initialization
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// watermelon