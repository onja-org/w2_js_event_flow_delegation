# 🧠 Understanding DOM Event Flow and Delegation

## 🧩 Core Concepts

### 1. DOM Event Flow 🔁

When a DOM event occurs, it goes through three phases:

1. **Capturing Phase** ⬇️
   - Event travels from `window` down to the target
   - Rarely used but powerful for special cases
   
2. **Target Phase** ⚡
   - Event reaches the actual element clicked/triggered
   
3. **Bubbling Phase** ⬆️
   - Event bubbles up from target back to `window`
   - Most event handlers listen during this phase

When an event (like `click`) happens on an element, it doesn't instantly finish on that element. The browser processes it in phases:
  - Capturing phase: the event moves from the outermost document down to the target's parent(s).
  - Target phase: the event reaches the target element.
  - Bubbling phase: the event bubbles back up from the target to the document.

Most event listeners are registered for the bubbling phase by default. You can opt into capturing by passing `{ capture: true }` to `addEventListener`.

### 2 - Why care about phases? ❓

- Understanding phases lets you control when handlers run relative to others.
- `event.stopPropagation()` prevents further propagation in the current phase (and further phases).
- `event.preventDefault()` prevents the default browser action (e.g., link navigation, form submit).


### 3 - What is event delegation? 🔍

- Instead of attaching a listener to every child element (e.g., many list items), attach one listener to a common ancestor and check the event's `target` to decide what to do.
- Benefits: fewer listeners, simpler memory usage, works for items added dynamically.


### 4 - Example: delegated click handler 💡

```js
// Listen on the container
container.addEventListener('click', (event) => {
  // `event.target` is the actual element clicked by the user
  const btn = event.target.closest('.todo-button');
  if (!btn || !container.contains(btn)) return; // ignore clicks outside

  // handle the click
  const itemEl = btn.closest('.todo-item');
  // do something with itemEl
});
```


### 5 - Common pitfalls and tips ⚠️

- When matching elements, prefer `closest()` over comparing `className` strings.
- Be careful with nested clickable controls: stopping propagation might prevent other needed handlers.
- For accessibility, ensure keyboard (Enter/Space) handling also triggers the same behavior.

Next: complete the exercise in `exercise.md` and open `index.html` to try the starter `exercise.js` code.