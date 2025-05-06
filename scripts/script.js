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

// Создаем контейнер для задач и список один раз
const taskwrap = document.createElement('div')
app.appendChild(taskwrap)
taskwrap.classList.add('taskwrap')

const tasklist = document.createElement('ul')
taskwrap.appendChild(tasklist)
tasklist.classList.add('tasklist')

// Загрузка задач из localStorage и отображение
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  tasks.forEach(task => {
    addTaskToDOM(task)
  })
}

// Сохранение задач в localStorage
function saveTasks() {
  const tasks = []
  tasklist.querySelectorAll('li').forEach(li => {
    // Текст задачи - это текст первого дочернего узла (span)
    tasks.push(li.querySelector('span').textContent)
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Добавление задачи в DOM с кнопками "Удалить" и "В процессе"
function addTaskToDOM(task) {
  const taskItem = document.createElement('li')
  taskItem.classList.add('taskItem')
  taskItem.classList.add('smiley-icon') // Добавляем стиль с иконкой смайлика

  const taskText = document.createElement('span')
  taskText.textContent = task
  taskItem.appendChild(taskText)

  // Создаем контейнер для кнопок, чтобы разместить их рядом друг с другом
  const buttonsContainer = document.createElement('div')
  buttonsContainer.classList.add('buttons-container')

  // Кнопка "В процессе"
  const inProgressBtn = document.createElement('button')
  inProgressBtn.textContent = 'В процессе'
  inProgressBtn.classList.add('inProgressBtn')
  buttonsContainer.appendChild(inProgressBtn)

  // Обработчик клика для кнопки "В процессе"
  inProgressBtn.onclick = function() {
    taskItem.classList.toggle('in-progress')
  }

  // Кнопка "Удалить"
  const delBtn = document.createElement('button')
  delBtn.textContent = 'Удалить'
  delBtn.classList.add('delBtn')
  buttonsContainer.appendChild(delBtn)

  delBtn.onclick = function() {
    taskItem.remove()
    saveTasks()
  }

  // Добавляем контейнер с кнопками в элемент задачи
  taskItem.appendChild(buttonsContainer)

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

// Инициализация загрузки задач при старте
loadTasks()
