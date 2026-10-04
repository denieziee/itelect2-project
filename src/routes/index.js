import express from "express";
import db from "../../models/index.cjs";

const { Task, User } = db;
const router = express.Router();

// Never send the password hash when a User is included inside a Task
const safeUser = { model: User, attributes: { exclude: ["password"] } };

// GT8: required JOIN query -- every task comes back with its owning user
router.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll({ include: safeUser, order: [["id", "ASC"]] });
  res.json(tasks);
});

router.get("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id, { include: safeUser });
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

router.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

router.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  await task.update(req.body);
  res.json(task);
});

router.delete("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  await task.destroy();
  res.json({ message: "Deleted", task });
});

// GT8: replaces the old fetch-based mock list
router.get("/users", async (req, res) => {
  const users = await User.findAll({ include: Task, order: [["id", "ASC"]] });
  res.json(users);
});

export default router;