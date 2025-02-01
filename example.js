// Define the base API URL using an environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/tasks';

// Fetch tasks from the back-end
async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.task;
    if (task.completed) li.classList.add('completed');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', async () => {
      await fetch(`${API_URL}/${task.id}`, { method: 'DELETE' });
      fetchTasks();
    });

    li.addEventListener('click', async () => {
      await fetch(`${API_URL}/${task.id}`, { method: 'PUT' });
      fetchTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Add a new task
document.getElementById('addTaskBtn').addEventListener('click', async () => {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskText }),
    });
    taskInput.value = '';
    fetchTasks();
  }
});

// Initial fetch to load tasks
fetchTasks();
