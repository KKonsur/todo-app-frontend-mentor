const addTaskForm = document.querySelector('.add-task')
const addTaskInput = document.querySelector('.add')
const taskList = document.querySelector('.todo__task-list')
const removeAllTask = document.querySelector('.remove-all')
const switchThemeButton = document.querySelector('.switch-mode')
const filtersItems = document.querySelectorAll('.todo__filters-item')
let counter = 0

const changeTheme = () => {
   let switchMode = true
   switchThemeButton.addEventListener('click', () => {
      const body = document.body
      switchMode = !switchMode
      body.getAttribute('data-mode') === 'light' ? body.setAttribute('data-mode', 'dark') : body.setAttribute('data-mode', 'light')
      switchMode ? switchThemeButton.src = './images/icon-moon.svg' : switchThemeButton.src = './images/icon-sun.svg'
   })
}
changeTheme()

const updateCounter = () => {
   document.querySelector('.todo__counter-value').innerHTML = counter
}

const removeTask = (removeButton, task) => {
   removeButton.addEventListener('click', () => {
      counter--
      task.remove()
      updateCounter()
   })
}

const checkTask = (circle, taskName, task) => {
   const checkIcon = document.createElement('img')
   circle.addEventListener('click', () => {
      circle.classList.toggle('circle--checked')
      taskName.classList.toggle('todo__task-name-checked')
      checkIcon.src = '../images/icon-check.svg'
      circle.classList.contains('circle--checked') ? circle.appendChild(checkIcon) : checkIcon.remove()
      task.classList.toggle('.todo__task--checked')
   })
   taskName.addEventListener('click', () => {
      circle.classList.toggle('circle--checked')
      taskName.classList.toggle('todo__task-name-checked')
      checkIcon.src = '../images/icon-check.svg'
      circle.classList.contains('circle--checked') ? circle.appendChild(checkIcon) : checkIcon.remove()
      task.classList.toggle('.todo__task--checked')
   })
}

const filterTaskAll = task => {
   const btn = document.getElementById('filter-all')
   btn.addEventListener('click', () => {
      task.classList.remove('todo__task--hidden')
      counter = document.querySelectorAll('.todo__task').length
      updateCounter()
   })
}

const filterTaskActive = task => {
   const btn = document.getElementById('filter-active')
   btn.addEventListener('click', () => {
      task.classList.remove('todo__task--hidden')
      task.classList.contains('.todo__task--checked') && task.classList.add('todo__task--hidden')
      counter = document.querySelectorAll('.todo__task:not(.todo__task--hidden)').length;
      updateCounter()
   })
}

const filterTaskCompleted = task => {
   const btn = document.getElementById('filter-completed')
   btn.addEventListener('click', () => {
      task.classList.remove('todo__task--hidden')
      !task.classList.contains('.todo__task--checked') && task.classList.add('todo__task--hidden')
      counter = document.querySelectorAll('.todo__task:not(.todo__task--hidden)').length;
      updateCounter()
   })
}

const clearComplete = task => {
   const btn = document.querySelector('.todo__clear')
   btn.addEventListener('click', () => {
      task.classList.contains('.todo__task--checked') && task.remove()
      counter = document.querySelectorAll('.todo__task:not(.todo__task--hidden)').length;
      updateCounter()
   })
}

const addTask = () => {
   const task = document.createElement('li')
   const taskName = document.createElement('span')
   const circle = document.createElement('button')
   const removeButton = document.createElement('button')
   const img = document.createElement('img')
   counter++
   task.classList.add('todo__task')
   taskName.textContent = addTaskInput.value
   task.appendChild(taskName)
   circle.classList.add('circle')
   removeButton.classList.add('todo__task-remove')
   img.src = 'images/icon-cross.svg'
   document.querySelector('.todo__task-list').appendChild(task)
   task.prepend(circle)
   removeButton.appendChild(img)
   task.appendChild(removeButton)
   addTaskInput.value = ''
   removeTask(removeButton, task)
   checkTask(circle, taskName, task)
   filterTaskAll(task)
   filterTaskActive(task)
   filterTaskCompleted(task)
   clearComplete(task)
   updateCounter()
}

filtersItems.forEach(item => {
   item.addEventListener('click', () => {
      filtersItems.forEach(item => item.classList.remove('todo__filters-item--active'))
      item.classList.add('todo__filters-item--active')
   })
})

addTaskForm.addEventListener('submit', e => {
   e.preventDefault()
   addTaskInput.value && addTask()
})

document.querySelector('.circle-add').addEventListener('click', () => {
   addTaskInput.value && addTask()
})
