let tasks = JSON.parse(localStorage.getItem('todo')) || []

const root = document.querySelector('#root')

const container = document.createElement('div')
container.className = 'container'
root.append(container)

const taskList = document.createElement('div')
taskList.className = 'task-list'
container.append(taskList)

const noTasks = document.createElement('span')
noTasks.className = 'no-tasks'
noTasks.innerText = 'No tasks for today'

const addHeaderForm = createHeaderForm()
container.prepend(addHeaderForm)

function createHeaderForm () {
  const titleForm = document.createElement('form')
  titleForm.className = 'title-form'

  titleForm.addEventListener('submit', function (event) {
    event.preventDefault()
    if (entryField.value) {
      const task = {
        id: `${Date.now()}`,
        date: new Date().toLocaleDateString(),
        isCompleted: false,
        text: entryField.value
      }
      tasks.push(task)
      entryField.value = ''
      renderingCards()
    } else {
      alert('todo not filled')
    }
    localStorage.setItem('todo', JSON.stringify(tasks))
  })

  const btnDelete = document.createElement('button')
  btnDelete.className = 'btn-delete'
  btnDelete.innerText = 'Delete All'
  btnDelete.type = 'button'
  btnDelete.addEventListener('click', function () {
    const deleteTodoList = confirm('Do you want delete all todo?')
    if (deleteTodoList) {
      tasks = JSON.parse(localStorage.getItem('todo'))
      tasks = []
      localStorage.setItem('todo', JSON.stringify(tasks))
      renderingCards()
    }
  })

  const entryField = document.createElement('input')
  entryField.className = 'entry-field'
  entryField.placeholder = 'Enter todo ...'
  entryField.type = 'text'

  const btnAdd = document.createElement('button')
  btnAdd.className = 'btn-add'
  btnAdd.innerText = 'Add'
  btnAdd.type = 'submit'

  container.append(titleForm)
  titleForm.append(btnDelete, entryField, btnAdd)

  return titleForm
}

function addCard (task, date, isCompleted, id) {
  const todoCard = document.createElement('div')
  todoCard.className = isCompleted ? 'done-card' : 'todo-card'
  todoCard.id = id
  const checkboxOther = document.createElement('label')
  checkboxOther.className = 'checkbox-other'

  const customCheckbox = document.createElement('input')
  customCheckbox.className = 'custom-checkbox'
  customCheckbox.checked = isCompleted
  customCheckbox.id = `task${id}`
  customCheckbox.type = 'checkbox'
  customCheckbox.name = `task${id}`
  customCheckbox.addEventListener('click', () => {
    if (customCheckbox.checked === true) {
      todoText.className = 'done'
      todoCard.className = 'done-card'
    } else if (customCheckbox.checked === false) {
      todoText.className = 'todo-text'
      todoCard.className = 'todo-card'
    }
    changeItem(id)
    localStorage.setItem('todo', JSON.stringify(tasks))
  })
  const check = document.createElement('span')
  check.className = 'check'

  const todoText = document.createElement('p')
  todoText.className = isCompleted ? 'done' : 'todo-text'
  todoText.innerText = task

  const closeList = document.createElement('button')
  closeList.className = 'close-list'
  closeList.type = 'button'
  closeList.id = `onDelete_${id}`
  closeList.addEventListener('click', onDelete)

  const dateTodo = document.createElement('p')
  dateTodo.className = 'date'
  dateTodo.innerText = date

  checkboxOther.append(customCheckbox, check)
  todoCard.append(checkboxOther, todoText, closeList, dateTodo)
  return todoCard
}

function changeItem (id) {
  tasks = tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)
}

function onDelete (event) {
  const deleteTask = confirm('Do you want delete todo?')
  const id = event.target.id.split('onDelete_').join('')
  if (deleteTask) {
    tasks = JSON.parse(localStorage.getItem('todo'))
    const newTasks = tasks.filter(obj => obj.id !== id)
    localStorage.setItem('todo', JSON.stringify(newTasks))
    tasks = tasks.filter(el => el.id !== id)
  }
  renderingCards()
}

function renderingCards () {
  taskList.innerHTML = ''
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const todoCard = addCard(task.text, task.date, task.isCompleted, task.id)
      taskList.append(todoCard)
    })
  } else {
    taskList.append(noTasks)
  }
}

renderingCards()
