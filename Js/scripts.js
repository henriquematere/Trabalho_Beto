// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue; // Variável para armazenar o valor antigo da tarefa durante a edição

// Funções
const saveTodo = (text) => {
    // Criação de elementos
    const todo = document.createElement("div"); // Cria um novo div para a tarefa
    todo.classList.add("todo"); // Adiciona a classe "todo" ao div

    const todoTitle = document.createElement("h3"); // Cria um elemento h3 para o título da tarefa
    todoTitle.innerText = text; // Define o texto do título da tarefa
    todo.appendChild(todoTitle); // Adiciona o título ao div da tarefa

    const doneBtn = document.createElement("button"); // Cria um botão para marcar a tarefa como concluída
    doneBtn.classList.add("finish-todo"); // Adiciona a classe "finish-todo" ao botão
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; // Define o ícone do botão
    todo.appendChild(doneBtn); // Adiciona o botão ao div da tarefa

    const editBtn = document.createElement("button"); // Cria um botão para editar a tarefa
    editBtn.classList.add("edit-todo"); // Adiciona a classe "edit-todo" ao botão
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'; // Define o ícone do botão
    todo.appendChild(editBtn); // Adiciona o botão ao div da tarefa

    const deleteBtn = document.createElement("button"); // Cria um botão para remover a tarefa
    deleteBtn.classList.add("remove-todo"); // Adiciona a classe "remove-todo" ao botão
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; // Define o ícone do botão
    todo.appendChild(deleteBtn); // Adiciona o botão ao div da tarefa
    
    // Adicionando os itens na lista
    todoList.appendChild(todo); // Adiciona a tarefa completa (div) à lista de tarefas

    // Limpando a área de criação
    todoInput.value = ""; // Limpa o campo de entrada de nova tarefa
    todoInput.focus(); // Coloca o foco de volta no campo de entrada para facilitar a adição de novas tarefas
};  

const toggleForms = () => {
    editForm.classList.toggle("hide"); // Alterna a visibilidade do formulário de edição
    todoForm.classList.toggle("hide"); // Alterna a visibilidade do formulário de adição
    todoList.classList.toggle("hide"); // Alterna a visibilidade da lista de tarefas
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo"); // Seleciona todas as tarefas existentes

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3"); // Seleciona o título da tarefa

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text; // Atualiza o título da tarefa se ele corresponder ao valor antigo
        }
    });
};

// Eventos
    // Evento de "enviar" para o botão "+"
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Previne o comportamento padrão do envio do formulário

    const inputValue = todoInput.value; // Obtém o valor do campo de entrada

    if(inputValue) {
        saveTodo(inputValue); // Salva a nova tarefa se houver um valor
    }
});

document.addEventListener("click", (e) => {
    // Adicionando eventos nos botões
    const targetEl = e.target; // Obtém o elemento que foi clicado
    const parentEl = targetEl.closest("div"); // Obtém o elemento pai mais próximo que é um div
    let todoTitle;
    
    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText; // Obtém o título da tarefa
    }

    // Concluir tarefa
    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done"); // Marca ou desmarca a tarefa como concluída
    }

    // Remover tarefa
    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove(); // Remove a tarefa da lista
    }

    // Editar tarefa
    if(targetEl.classList.contains("edit-todo")) {
        toggleForms(); // Alterna os formulários

        editInput.value = todoTitle; // Preenche o campo de edição com o título da tarefa
        oldInputValue = todoTitle; // Armazena o valor antigo do título
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Previne o comportamento padrão do botão

    toggleForms(); // Alterna os formulários sem fazer mudanças
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Previne o comportamento padrão do envio do formulário

    const editInputValue = editInput.value; // Obtém o valor do campo de edição

    if(editInputValue) {
        updateTodo(editInputValue); // Atualiza a tarefa se houver um valor
    }
    toggleForms(); // Alterna os formulários após a edição
});
