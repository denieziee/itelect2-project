import express from "express";
import db from "../../models/index.cjs";
import verifyToken from "../middleware/verifyToken.js";
import requireRole from "../middleware/requireRole.js";

const { Task, User } = db;
const router = express.Router();

// Never send the password hash when a User is included inside a Task
const safeUser = { model: User, attributes: { exclude: ["password"] } };

// The only columns a request may set (blocks mass assignment of id, createdAt...)
const TASK_FIELDS = ["title", "dueDate", "completed", "userId"];

// GET /api/tasks -- public
router.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll({ include: safeUser, order: [["id", "ASC"]] });
  res.json(tasks);
});

// GET /api/tasks/:id -- public
router.get("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id, { include: safeUser });
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// POST /api/tasks -- any logged-in user
router.post("/tasks", verifyToken, async (req, res) => {
  const task = await Task.create(req.body, { fields: TASK_FIELDS });
  res.status(201).json(task);
});

// PUT /api/tasks/:id -- any logged-in user
router.put("/tasks/:id", verifyToken, async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  await task.update(req.body, { fields: TASK_FIELDS });
  res.json(task);
});

// DELETE /api/tasks/:id -- admin only
router.delete(
  "/tasks/:id",
  verifyToken,
  requireRole("admin"),
  async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.json({ message: "Deleted", task, deletedBy: req.user.email });
  }
);

// GET /api/users -- public (User.toJSON strips the password)
router.get("/users", async (req, res) => {
  const users = await User.findAll({ include: Task, order: [["id", "ASC"]] });
  res.json(users);
});

export default router;