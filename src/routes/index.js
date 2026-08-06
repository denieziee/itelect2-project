import express from "express";
import { mockTasks } from "../utils.js";
import { fetchSampleUsers } from "../api.js";

const router = express.Router();
let cachedUsers = [];

fetchSampleUsers()
  .then((users) => {
    cachedUsers = users;
    console.log(`Cached ${cachedUsers.length} users.`);
  })
  .catch((err) => console.error("Failed to cache users:", err.message));

// GET /api/tasks
router.get("/tasks", (req, res) => {
  res.json(mockTasks);
});

// GET /api/tasks/:id
router.get("/tasks/:id", (req, res) => {
  const task = mockTasks.find((t) => String(t.id) === req.params.id);

  if (!task) {
    return res
      .status(404)
      .json({ error: `Task with id ${req.params.id} not found` });
  }

  res.json(task);
});

// GET /api/users
router.get("/users", (req, res) => {
  res.json(cachedUsers);
});

export default router;