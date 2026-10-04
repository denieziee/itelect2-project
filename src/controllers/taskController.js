import db from "../../models/index.cjs";

const { Task, User } = db;

// Never send the password hash when a User is included inside a Task
const safeUser = { model: User, attributes: { exclude: ["password"] } };

// The only columns a request may set
const TASK_FIELDS = ["title", "dueDate", "completed", "userId"];

// GET /api/tasks
export async function listTasks(req, res) {
  const tasks = await Task.findAll({ include: safeUser, order: [["id", "ASC"]] });
  res.json(tasks);
}

// GET /api/tasks/:id
export async function getTask(req, res) {
  const task = await Task.findByPk(req.params.id, { include: safeUser });
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
}

// POST /api/tasks
export async function createTask(req, res) {
  const task = await Task.create(req.body, { fields: TASK_FIELDS });
  res.status(201).json(task);
}

// PUT /api/tasks/:id
export async function updateTask(req, res) {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  await task.update(req.body, { fields: TASK_FIELDS });
  res.json(task);
}

// DELETE /api/tasks/:id
export async function deleteTask(req, res) {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  await task.destroy();
  res.json({ message: "Deleted", task, deletedBy: req.user.email });
}