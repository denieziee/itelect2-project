import express from "express";
import { tasks } from "../utils.js";
import { fetchSampleUsers } from "../api.js";

const router = express.Router();

// Cache users variable (fetched once when server starts)
let cachedUsers = [];

(async () => {
  try {
    const rawUsers = await fetchSampleUsers();
    cachedUsers = rawUsers.map(({ id, name, email }) => ({ id, name, email }));
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
})();

// GET /api/tasks -> Returns all mock tasks
router.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id -> Returns single task or 404 error
router.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// GET /api/users -> Returns cached user list
router.get("/users", (req, res) => {
  res.json(cachedUsers);
});

export default router;