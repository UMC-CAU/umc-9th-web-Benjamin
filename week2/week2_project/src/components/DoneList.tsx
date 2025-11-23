
import { useTodos } from "../contexts/TodoContext";

export function DoneList() {
  const { doneTasks, deleteTask } = useTodos();

  return (
    <section className="render-container__section">
      <h2 className="render-container__title">해낸 일</h2>
      <ul id="completed-list" className="render-container__list">
        {doneTasks.map((task) => (
          <li key={task.id} className="render-container__item">
            <span className="render-container__text">{task.text}</span>
            <button
              className="render-container__item-button"
              onClick={() => deleteTask(task.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
