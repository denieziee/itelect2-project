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