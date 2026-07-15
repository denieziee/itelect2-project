// LET & CONST VS VAR
// ES5 - var (function-scoped, can be reassigned/redeclared)
var age = 21;
var age = 22; // no error, confusing, but allowed.

// ES6 - let and const (block-scoped, can be reassigned but not redeclared)
let age = 21;
age = 22; // fine, let can be reassigned
const PI = 3.1416; // constant, cannot be reassigned or redeclared

// ------------------------------------------------------------
// ARROW FUNCTIONS
// ES5 - regular function
function add(a, b) {
    return a + b;
}

// ES6 - arrow function
const add = (a, b) => a + b;

// ------------------------------------------------------------
// TEMPLATE LITERALS
// ES5 - string concatenation
var greeting = "Hello, " + name + "! You are " + age + " years old.";

// ES6 - template literals
    const greeting = `Hello, ${name}! You are ${age} years old.`;

// ------------------------------------------------------------
// DESTRUCTURING OBJECTS
// ES5 - accessing object properties
const user = { name: 'Alice', email: "alice@example.com", role: "admin" };

// ES6 - object destructuring
const { name, email, role } = user;
console.log(name, email, role); 

// ------------------------------------------------------------
// DESTRUCTURING ARRAYS
// ES5 - accessing array elements
const scores = [95, 88, 76];

// ES6 - array destructuring
const [first, second, third] = scores;
    console.log(first, second, third); // 95 88 76

// ------------------------------------------------------------
// SPREAD & REST OPERATORS
// Spread - combine arrays
const num1 = [1, 2, 3];
const num2 = [4, 5, 6];
const combined = [...num1, ...num2]; // [1, 2, 3, 4, 5, 6]

// Rest - collect remaining elements / collect function arguments
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

// Example calls
console.log(sum(1, 2, 3));      // 6
console.log(sum(10, 20));       // 30
console.log(sum(5, 5, 5, 5));   // 20
console.log(sum());             // 0

// ------------------------------------------------------------
// DEFAULT PARAMETERS
// ES6 - default parameters
function greet(name = "Guest", role = "user") {
    return `Welcome, ${name}! Your role is ${role}.`;
}

console.log(greet()); // Welcome, Guest! Your role is user.
console.log(greet("Alice", "admin")); // Welcome, Alice! Your role is admin.

// export
export const add = (a, b) => a + b;
export const greet = (name) => `Hello, ${name}!`;