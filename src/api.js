import express from "express";
import { mockTasks, fetchSampleUsers } from "./utils.js";

const router = express.Router();

// Cache users once when the server starts
let cachedUsers = [];
fetchSampleUsers()
  .then((users) => {
    cachedUsers = users;
  })
  .catch((err) => console.error("Error caching users:", err));

// GET /api/tasks
router.get("/tasks", (req, res) => {
  res.json(mockTasks);
});

// GET /api/tasks/:id
router.get("/tasks/:id", (req, res) => {
  const task = mockTasks.find((t) => t.id === parseInt(req.params.id, 10));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// GET /api/users
router.get("/users", (req, res) => {
  res.json(cachedUsers);
});

export default router;