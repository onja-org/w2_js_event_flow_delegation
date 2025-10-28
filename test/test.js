/**
 * @jest-environment jsdom
 */

beforeEach(() => {
  // Set up HTML
  document.body.innerHTML = `
    <input id="new-task-text" placeholder="New task">
    <button id="add-task">Add</button>
    <ul id="task-list">
      <li>Task 1 <button class="remove">Remove</button></li>
      <li>Task 2 <button class="remove">Remove</button></li>
    </ul>
  `;

  // Inline JS from solutions.js
  const input = document.getElementById('new-task-text');
  const addBtn = document.getElementById('add-task');
  const list = document.getElementById('task-list');

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Remove';
    delBtn.classList.add('remove');
    li.textContent = text + ' ';
    li.prepend(checkbox);
    li.appendChild(delBtn);
    list.appendChild(li);
    input.value = '';
    input.focus();
  });

  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
      e.target.parentElement.classList.toggle('completed');
    }
    if (e.target.classList.contains('remove')) {
      e.target.parentElement.remove();
    }
  });
});

// ✅ Now define actual tests
test('adds a new task to the list', () => {
  const input = document.getElementById('new-task-text');
  const addBtn = document.getElementById('add-task');
  const list = document.getElementById('task-list');

  input.value = 'Test Task';
  addBtn.click();

  expect(list.children.length).toBe(3); // initially 2 + 1 added
  expect(list.lastChild.textContent).toContain('Test Task');
});

test('checkbox toggles completed class', () => {
  const list = document.getElementById('task-list');
  const firstLi = list.querySelector('li');
  const checkbox = firstLi.querySelector('input[type="checkbox"]') || (() => {
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    firstLi.prepend(cb);
    return cb;
  })();

  checkbox.click();
  expect(firstLi.classList.contains('completed')).toBe(true);

  checkbox.click();
  expect(firstLi.classList.contains('completed')).toBe(false);
});

test('remove button deletes task', () => {
  const list = document.getElementById('task-list');
  const firstLi = list.querySelector('li');
  const removeBtn = firstLi.querySelector('.remove');

  removeBtn.click();
  expect(list.children.length).toBe(1);
});
