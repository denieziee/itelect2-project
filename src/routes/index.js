import express from "express";
import { validateTask, mergeTaskUpdate, mockTasks } from "../utils.js";
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

// POST /api/tasks
router.post("/tasks", (req, res, next) => {
  if (!validateTask(req.body)) {
    const err = new Error("title and dueDate required");
    err.status = 400;
    return next(err);
  }
  const task = { id: Date.now(), completed: false, ...req.body };
  mockTasks.push(task);
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put("/tasks/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const index = mockTasks.findIndex((t) => t.id === id);
  if (index === -1) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }
  mockTasks[index] = mergeTaskUpdate(mockTasks[index], req.body);
  res.status(200).json(mockTasks[index]);
});

// DELETE /api/tasks/:id
router.delete("/tasks/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const index = mockTasks.findIndex((t) => t.id === id);
  if (index === -1) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }
  const [removed] = mockTasks.splice(index, 1);
  res.status(200).json({ message: "Task deleted", task: removed });
});

// GET /api/users
router.get("/users", (req, res) => {
  res.json(cachedUsers);
});

export default router;

// http://localhost:3000/api/tasks

// http://localhost:3000/api/tasks/1

// http://localhost:3000/api/users