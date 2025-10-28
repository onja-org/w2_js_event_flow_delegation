/**
 * 🧩 Event Flow & Delegation Exercise
 * -----------------------------------
 * Implement todo list functionality using event delegation.
 * 
 * Requirements:
 * 1. Use a single click handler on the container
 * 2. Log event phases (capture/bubble)
 * 3. Handle item toggling and deletion
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // 🧠 Step 1: Handle form submission
  // - Prevent default form behavior
  // - Get the input text
  // - Create a new <li> element with a checkbox and delete button
  // - Append it to the list
  // - Clear and refocus the input
  // ✏️ Write your code here

  // 🧠 Step 2: Add two event listeners on the list
  // - One for capturing phase (useCapture = true)
  // - One for bubbling phase (default)
  // - Both should log the event phase and target
  // ✏️ Write your code here

  // 🧠 Step 3: In the bubbling phase handler:
  // - If a checkbox is clicked, toggle a “completed” class on the parent <li>
  // - If a delete button is clicked, remove the item
  // ✏️ Write your code here
});
