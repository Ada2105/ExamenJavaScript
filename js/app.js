let tasks = JSON.parse
    (localStorage.getItem('tasks')) || [];

document.addEventListener
    ("DOMContentLoaded", function () {
        renderTasks();
    });

// Function to view task
function renderTasks() {
    const columns =
        ['to-do', 'in-progress', 'completed'];

    columns.forEach(columnId => {
        const column =
            document.getElementById(columnId);
        column.querySelector('.cont-tasks').
            innerHTML = '';

        tasks.forEach(task => {
            if (task.status === columnId) {
                const taskElement =
                    createTaskElement(task.content, task.id);
                column.querySelector('.cont-tasks').
                    appendChild(taskElement);
            }
        });
    });
}

function createTaskElement(content, id) {
    const taskId = id
    const task = document.createElement("div");
    task.id = taskId;
    task.className = "task";
    task.draggable = true;
    task.innerHTML =
        `${content}
    <div class="tasks">
    <span class="delete-btn" 
        onclick="deleteTask('${taskId}')"> Delete
    </span>`;
    task.addEventListener("dragstart", drag);
    return task;
}




// Function to delete
function deleteTask(taskId) {
    tasks = tasks.
        filter(task => task.id !== taskId);
    updateLocalStorage();
    renderTasks();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.
        setData("text/plain", event.target.id);
}

function drop(event, columnId) {
    event.preventDefault();
    console.log(columnId)
    const data = event.
        dataTransfer.getData("text/plain");
    const draggedElement =
        document.getElementById(data);
    console.log(draggedElement)
    if (draggedElement) {
        const taskStatus = columnId;
        updateTaskStatus(data, taskStatus);
        event.target.querySelector('.cont-tasks').
            appendChild(draggedElement);
    }
}

function capitalizeInput(input) {
    input.value = input.value.toUpperCase();
}

function addTask(columnId) {
    const taskInput =
        document.getElementById('taskInput');
    const taskContent = taskInput.value.trim();
    if (taskContent !== "") {
        const newTask = {
            id: "task-" + Date.now(),
            content: taskContent,
            status: columnId
        };
        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        taskInput.value = "";
    }
}

//// Function to update state
function updateTaskStatus(taskId, newStatus) {
    console.log(newStatus)
    tasks = tasks.map(task => {
        console.log(task)
        console.log(taskId)
        if (task.id === taskId) {
            console.log("inside if")
            return { ...task, status: newStatus };
        }
        return task;
    });
    updateLocalStorage();
}

// Funtion storage
function updateLocalStorage() {
    console.log("task update")
    localStorage.setItem
        ('tasks', JSON.stringify(tasks));
}
