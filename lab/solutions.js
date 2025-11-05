document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // Step 1: Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement('li');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Remove';
    delBtn.classList.add('remove');

    // Append in order
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(' ' + text + ' '));
    li.appendChild(delBtn);

    list.appendChild(li);

    input.value = '';
    input.focus();
  });

  // Step 2 & 3: Event delegation on the container
  list.addEventListener('click', (e) => {
    console.log('Bubbling phase:', e.target);

    // Toggle completed class
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
      e.target.parentElement.classList.toggle('completed');
    }

    // Remove task
    if (e.target.classList.contains('remove')) {
      e.target.parentElement.remove();
    }
  });

  // Capturing phase logging
  list.addEventListener(
    'click',
    (e) => {
      console.log('Capturing phase:', e.target);
    },
    true
  );
});
