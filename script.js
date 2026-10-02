const homeworkForm = document.getElementById('homework-form');
const homeworkList = document.getElementById('homework-list');
let homework = JSON.parse(localStorage.getItem('homework')) || [];
function displayHomework() {
    homeworkList.innerHTML = '';
    homework.forEach(function(item, index) {
        const homeworkItem = document.createElement("div");
        homeworkItem.classList.add("homework-item");
        const date = new Date(item.dueDate);
        const formattedDate = date.toLocaleDateString('en-AU', {
            day: "numeric",
            month: "short"
        });
        homeworkItem.innerHTML = `
            <span>${item.taskName}</span>
            <span>${item.priority}</span>
            <span>${formattedDate}</span>
            <button class="delete-homework" data-index="${index}">Delete</button>
        `;
        homeworkList.appendChild(homeworkItem);
    });
}
homeworkForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('due-date').value;
    const newHomework = {
        taskName: taskName,
        priority: priority,
        dueDate: dueDate
    };
    homework.push(newHomework);
    localStorage.setItem('homework', JSON.stringify(homework));
    displayHomework();
    homeworkForm.reset();
});
homeworkList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-homework')) {
        const index = event.target.dataset.index;
        homework.splice(index, 1);
        localStorage.setItem('homework', JSON.stringify(homework));
        displayHomework();
    }
});
displayHomework();
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
let todos = JSON.parse(localStorage.getItem('todos')) || [];
function displayTodos() {
    todoList.innerHTML = '';
    todos.forEach(function(todo, index) {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        const taskText = document.createElement('span');
        taskText.textContent = todo.task;
        if (todo.completed) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.opacity = '0.5';
        }
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.index = index;
        deleteButton.classList.add('delete-todo');
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
        checkbox.addEventListener('change', function() {
            todos[index].completed = checkbox.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        });
    });
}
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (text === '') {
        return;
    };
    const newTodo = {
        task: text,
        completed: false
    };
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
    todoInput.value = '';
});
todoList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-todo')) {
        const index = event.target.dataset.index;
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
    }
});
displayTodos();

let timeLeft = 25 * 60;
let timerInterval = null;
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startTimer');
const pauseButton = document.getElementById('pauseTimer');
const resetButton = document.getElementById('resetTimer');
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${formattedSeconds}`;
}
startButton.addEventListener('click', function() {
    if (timerInterval !== null) {
        return;
    }
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timeLeft = 0;
            updateTimer();
            alert("Pomodoro finished!")
        }
    }, 1000);
});
pauseButton.addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
});
resetButton.addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 25 * 60;
    updateTimer();
});
updateTimer();