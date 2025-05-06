const app = document.getElementById('case-added')

const title = document.createElement('h1')
title.textContent = 'Список задач'
app.appendChild(title)
title.classList.add('title')

const wrapper = document.createElement('div')
app.appendChild(wrapper)
wrapper.classList.add('wrapper')

const prompt = document.createElement('input')
wrapper.appendChild(prompt)
prompt.classList.add('prompt')

const btn = document.createElement('button')
btn.textContent = 'Добавить'
wrapper.appendChild(btn)
btn.classList.add('btn')

// Create task container and list once
const taskwrap = document.createElement('div')
app.appendChild(taskwrap)
taskwrap.classList.add('taskwrap')

const tasklist = document.createElement('ol')
taskwrap.appendChild(tasklist)
tasklist.classList.add('tasklist')

// Load tasks from localStorage and render
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  tasks.forEach(task => {
    addTaskToDOM(task)
  })
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = []
  tasklist.querySelectorAll('li').forEach(li => {
    // The task text is the li text content minus the delete button text
    // So we get the firstChild node value (text node)
    tasks.push(li.firstChild.textContent)
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Add task item to DOM with delete button and delete handler
function addTaskToDOM(task) {
  const taskItem = document.createElement('li')
  taskItem.classList.add('taskItem')

  const taskText = document.createElement('span')
  taskText.textContent = task
  taskItem.appendChild(taskText)

  const delBtn = document.createElement('button')
  delBtn.textContent = 'Удалить'
  delBtn.classList.add('delBtn')
  taskItem.appendChild(delBtn)

  delBtn.onclick = function() {
    taskItem.remove()
    saveTasks()
  }

  tasklist.appendChild(taskItem)
}

btn.onclick = function() {
  const task = prompt.value.trim()
  if (task) {
    addTaskToDOM(task)
    saveTasks()
    prompt.value = ''
  } else {
    alert('Введите задачу')
  }
}

// Initial load of tasks
loadTasks()
