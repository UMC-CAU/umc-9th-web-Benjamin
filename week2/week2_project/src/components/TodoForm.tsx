
import { useState } from "react";
import { useTodos } from "../contexts/TodoContext";

export function TodoForm() {
  const [inputValue, setInputValue] = useState("");
  const { addTodo } = useTodos();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="오늘의 할일을 입력하세요!"
      />
      <button type="submit" className="todo-container__button">
        추가
      </button>
    </form>
  );
}
