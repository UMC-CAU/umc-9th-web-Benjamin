
import { useTodos } from "../contexts/TodoContext";

export function TodoList() {
  const { todos, completeTask } = useTodos();

  return (
    <section className="render-container__section">
      <h2 className="render-container__title">해야할 일</h2>
      <ul id="todo-list" className="render-container__list">
        {todos.map((todo) => (
          <li key={todo.id} className="render-container__item">
            <span className="render-container__text">{todo.text}</span>
            <button
              className="render-container__item-button"
              onClick={() => completeTask(todo.id)}
            >
              완료
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
