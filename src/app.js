import { formatDate, validateTask, mergeTaskUpdates, createTask } from './utils.js';
import { fetchSampleUsers } from './api.js';

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

// ------------------------------------------------------------
// GT4 Async Operations

async function main() {
    try {
        console.log("Fetching sample users...");
        const users = await fetchSampleUsers();
        console.log("Users:", users);

        console.log("Creating new task...");
        
        const newTask = createTask({ 
            title: "Study Async JS", 
            dueDate: new Date().toLocaleDateString() 
        }); 

        console.log("Task created:", newTask);

    } catch (err) {
        console.error("Error:", err.message);
    }
}

main();