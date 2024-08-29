// Elementos
const todoForm = document.querySelector("#todo-form");
const todoCat = document.querySelector("#todo-categories");
const todoTask = document.querySelector("#todo-task");
const todoList = document.querySelector("#todo-list");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Gerar tarefas
function displayTasks() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const todo = document.createElement("div");
        todo.classList.add("todo");

        todo.innerHTML = `
            <div class="card ${task.done ? 'bg-success text-white' : ''}" style="width: 18rem; margin-right: -10px">
                <div class="card-body">
                    <h5 class="card-title" style="text-decoration: ${task.done ? 'line-through' : 'none'};">${task.category}</h5>
                    <p class="card-text" style="text-decoration: ${task.done ? 'line-through' : 'none'};">${task.task}</p>
                    <button type="button" class="btn btn-success" onclick="markDone(${index})"><i class="fa-solid fa-check"></i></button>
                    <button type="button" class="btn btn-warning" onclick="editTask(${index})"><i class="fa-solid fa-pen"></i></button>
                    <button type="button" class="btn btn-danger" onclick="deleteTask(${index})"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
        `;

        todoList.appendChild(todo);
    });
}

// Adicionando tarefa
function addTodo() {
    const categoryValue = todoCat.value.trim();
    const taskValue = todoTask.value.trim();

    if (categoryValue && taskValue) {
        const newTask = { category: categoryValue, task: taskValue, done: false };
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
        todoCat.value = "";
        todoTask.value = "";
    }
}

// Marcando como feito
function markDone(index) {
    console.log("markDone called for index:", index);
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // Chama displayTasks para atualizar a UI
    displayTasks();
}



// Editar tarefa
function editTask(index) {
    const newTask = prompt("Edite a sua tarefa:", tasks[index].task);
    if (newTask !== null) {
        tasks[index].task = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

// Deletando tarefa
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Evento de "enviar"
if (todoForm) {
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTodo();
    });
}

// Buscar de tarefas
if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
        const search = e.target.value.toLowerCase();

        document.querySelectorAll(".card").forEach((card) => {
            const title = card.querySelector(".card-title").innerText.toLowerCase();
            const text = card.querySelector(".card-text").innerText.toLowerCase();

            if (title.includes(search) || text.includes(search)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// Botão de apagar texto
if (eraseBtn) {
    eraseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("keyup"));
    });
}

// Filtros
if (filterBtn) {
    filterBtn.addEventListener("change", (e) => {
        const filterValue = e.target.value.toLowerCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach((card, index) => {
            const isDone = tasks[index].done;
            const cardText = card.querySelector(".card-text").innerText.toLowerCase();

            if (filterValue === "all" ||
                (filterValue === "done" && isDone) ||
                (filterValue === "todo" && !isDone)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// Carregar tarefas ao inicializar a página
document.addEventListener("DOMContentLoaded", loadTodos);

function loadTodos() {
    displayTasks();
}