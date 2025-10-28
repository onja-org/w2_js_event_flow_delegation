/**
 * @jest-environment jsdom
 */

// These tests are designed to guide you through implementing
// event flow and delegation. They should fail at first!
// Your task is to make them pass by implementing the required
// functionality in app.js

describe('Event Flow and Delegation Tests', () => {
  beforeEach(() => {
    // Set up our document body with the same HTML structure
    // that you have in your index.html
    document.body.innerHTML = `
      <div class="outer" id="outer">
        Outer
        <div class="middle" id="middle">
          Middle
          <button id="inner">Inner (click me)</button>
        </div>
      </div>
      <ul id="task-list">
        <li>Task 1 <button class="remove">Remove</button></li>
        <li>Task 2 <button class="remove">Remove</button></li>
      </ul>
    `;
    
    // Reset any mocks before each test
    jest.clearAllMocks();
    
    // Load your app code - implement the event handlers in this file!
    require('../files/app.js');
  });

  test('Exercise 1: Event flow works in correct order', () => {
    // TASK: In app.js, add click event listeners to outer, middle, and inner
    // elements that log which element was clicked and in what phase
    
    const consoleSpy = jest.spyOn(console, 'log');
    
    // When we click the inner button...
    const innerButton = document.getElementById('inner');
    innerButton.click();
    
    // We expect to see the events bubble up in this order:
    // 1. Inner (target phase)
    // 2. Middle (bubbling phase)
    // 3. Outer (bubbling phase)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Inner listener'));
    expect(consoleSpy.mock.calls.map(call => call[0])).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Inner listener'),
        expect.stringContaining('Middle'),
        expect.stringContaining('Outer')
      ])
    );
  });

  test('Exercise 2: Event delegation handles both existing and new tasks', () => {
    // TASK: In app.js, implement event delegation on the task-list
    // so that clicking any task (even newly added ones) logs its content
    
    const consoleSpy = jest.spyOn(console, 'log');
    
    // When we click an existing task...
    const firstTask = document.querySelector('#task-list li');
    firstTask.click();
    
    // It should log which task was clicked
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Clicked task: Task 1'));
    
    // When we add a new task...
    const input = document.getElementById('new-task-text');
    const addButton = document.getElementById('add-task');
    
    input.value = 'New Task';
    addButton.click();
    
    // The new task should be in the list
    const newTask = document.querySelector('#task-list li:last-child');
    expect(newTask.textContent.trim()).toContain('New Task');
    
    // And clicking it should work just like existing tasks
    newTask.click();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Clicked task: New Task'));
  });

  test('Exercise 3: Remove buttons work with delegation', () => {
    // TASK: In app.js, use event delegation to handle remove button clicks
    // Hint: Check if the clicked element has the 'remove' class!
    
    const taskList = document.getElementById('task-list');
    const initialTaskCount = taskList.children.length;
    
    // When we click a remove button...
    const firstRemoveButton = document.querySelector('.remove');
    firstRemoveButton.click();
    
    // The task should be removed from the list
    expect(taskList.children.length).toBe(initialTaskCount - 1);
  });
});