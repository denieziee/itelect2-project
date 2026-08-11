import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// test and visit:
// localhost:3000/api/tasks
// localhost:3000/api/tasks/1
// localhost:3000/api/users

// working