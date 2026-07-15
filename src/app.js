import { formatDate, validateTask, mergeTaskUpdates } from './utils.js';

console.log('Server starting...');

// Test formatDate
console.log(formatDate(new Date()));

// Test validateTask
console.log(validateTask({ title: "Finish HW", dueDate: "2026-07-22" })); 
console.log(validateTask()); 

// Test mergeTaskUpdates
const initialTask = { title: "Old", priority: "New" };
const updatedTask = mergeTaskUpdates(initialTask, { priority: "High" }, { completed: true });
console.log(updatedTask);

// there are no errors.