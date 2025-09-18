const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const donelist = document.getElementById("completed-list");
let todos = [];
let doneTasks = [];
const renderTask = () => {
    // Render Todos
    todoList.innerHTML = "";
    todos.forEach((todo) => {
        const listItem = document.createElement("li");
        listItem.className = "render-container__item";
        listItem.innerHTML = `
      <span class="render-container__text">${todo.text}</span>
      <button class="render-container__item-button">완료</button>
    `;
        listItem.querySelector("button")?.addEventListener("click", () => completeTask(todo.id));
        todoList.appendChild(listItem);
    });
    // Render Done Tasks
    donelist.innerHTML = "";
    doneTasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.className = "render-container__item";
        listItem.innerHTML = `
      <span class="render-container__text">${task.text}</span>
      <button class="render-container__item-button">삭제</button>
    `;
        listItem.querySelector("button")?.addEventListener("click", () => deleteTask(task.id));
        donelist.appendChild(listItem);
    });
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    renderTask();
    todoInput.value = "";
};
const completeTask = (id) => {
    const taskToComplete = todos.find(t => t.id === id);
    if (taskToComplete) {
        doneTasks.push(taskToComplete);
        todos = todos.filter(t => t.id !== id);
        renderTask();
    }
};
const deleteTask = (id) => {
    doneTasks = doneTasks.filter((t) => t.id !== id);
    renderTask();
};
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTodo(text);
    }
});
renderTask(); // Initial render
export {};
//# sourceMappingURL=todo.js.map