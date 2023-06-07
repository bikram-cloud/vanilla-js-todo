// Element select helper function

function qs(selector, parent) {
  const el = parent
    ? parent.querySelector(selector)
    : document.querySelector(selector);

  if (!el) throw new Error('Could not find elements');

  return el;
}

// Selectors
const todoInput = qs('.todo-input');
const todoButton = qs('.todo-button');
const todoList = qs('.todo-list');
const filteredOption = qs('.filter-todos');

console.log(todoInput);
console.log(todoButton);
console.log(todoList);

// Events Listener
document.addEventListener('DOMContentLoaded', getLocalTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filteredOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
  // preventDefault
  event.preventDefault();

  //Todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //Todo LI
  const newTodo = document.createElement('li');

  //   if input value is blank then return
  if (todoInput.value === '') return;

  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.append(newTodo);

  // Add Todo to LocalStorage
  saveLocalTodos(todoInput.value);

  //   Input clear
  todoInput.value = '';

  // Check Mark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.append(completedButton);

  // Check Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.append(trashButton);

  //   Append To List
  todoList.append(todoDiv);
}

function deleteCheck(e) {
  const item = e.target;
  // Delete Todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });

    console.log(item.parentElement);
  }

  // Check Mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    console.log(item.classList);
  }
}

//Filter todos
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;

      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
    }
  });
}

// Save todos in localStorage
function saveLocalTodos(todo) {
  // Check Do I aleready have thing in there
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// localStorage.clear();

function getLocalTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Todo LI
    const newTodo = document.createElement('li');

    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.append(newTodo);

    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.append(completedButton);

    // Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.append(trashButton);

    //   Append To List
    todoList.append(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
