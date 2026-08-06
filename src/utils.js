// ------------------------------------------------------------
// export
// ------------------------------------------------------------
export const add = (a, b) => a + b;
export const greet = (name) => `Hello, ${name}!`;

// formatDate(date)
export const formatDate = (date) => {
    return `Due: ${date.toLocaleDateString()}`;
};

// validateTask(task)
export const validateTask = ({ title, dueDate } = {}) => {
    return !!(title && dueDate);
};

// mergeTaskUpdates(task, updates)
export const mergeTaskUpdates = (original, ...updates) => {
    return updates.reduce((merged, currentUpdate) => {
        return { ...merged, ...currentUpdate };
    }, { ...original });
};

// TaskValidationError 
export class TaskValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "TaskValidationError";
  }
}

// createTask
export function createTask(taskData) {
  if (!validateTask(taskData)) {
    throw new TaskValidationError("Invalid task data");
  }
  return { id: Date.now(), completed: false, ...taskData };
}

export const mockTasks = [
  { id: 1, title: "Finish HW", dueDate: "2026-07-22", completed: false },
  { id: 2, title: "Study Async JS", dueDate: "2026-07-25", completed: false },
  { id: 3, title: "Push GT4 to GitHub", dueDate: "2026-07-28", completed: true },
];