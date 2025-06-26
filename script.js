const taskForm = document.getElementById('ta');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task;
    li.appendChild(span);

    const btn = document.createElement('button');
    btn.textContent = '🗑️';
    btn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

taskForm.onsubmit = function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    tasks.push(taskText);
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
};

renderTasks();