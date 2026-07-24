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