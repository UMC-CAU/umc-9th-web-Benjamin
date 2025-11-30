
import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { DoneList } from "./components/DoneList";

function App() {
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">정민의 TodoList</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList />
        <DoneList />
      </div>
    </div>
  );
}

export default App;
