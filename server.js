import express from "express";
import router from "./src/routes/index.js";

const app = express();

app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// test and visit:
// localhost:3000/api/tasks
// localhost:3000/api/tasks/1
// localhost:3000/api/users