const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const donelist = document.getElementById("completed-list") as HTMLUListElement;

type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTask = (): void => {
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

const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  renderTask();
  todoInput.value = "";
};

const completeTask = (id: number): void => {
  const taskToComplete = todos.find(t => t.id === id);
  if (taskToComplete) {
    doneTasks.push(taskToComplete);
    todos = todos.filter(t => t.id !== id);
    renderTask();
  }
};

const deleteTask = (id: number): void => {
  doneTasks = doneTasks.filter((t) => t.id !== id);
  renderTask();
};

todoForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    addTodo(text);
  }
});

renderTask(); // Initial render