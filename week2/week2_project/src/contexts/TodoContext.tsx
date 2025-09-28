
import { createContext, useState, useContext} from "react";
import type { ReactNode } from 'react';

// 1. 타입 정의
type Todo = {
  id: number;
  text: string;
};

type TodoContextType = {
  todos: Todo[];
  doneTasks: Todo[];
  addTodo: (text: string) => void;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

// 2. Context 생성
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// 3. Provider 컴포넌트 생성
type TodoProviderProps = {
  children: ReactNode;
};

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTasks, setDoneTasks] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    if (text.trim() === "") return;
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
  };

  const completeTask = (id: number) => {
    const taskToComplete = todos.find((t) => t.id === id);
    if (taskToComplete) {
      setDoneTasks((prev) => [...prev, taskToComplete]);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const deleteTask = (id: number) => {
    setDoneTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const value = {
    todos,
    doneTasks,
    addTodo,
    completeTask,
    deleteTask,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// 4. 커스텀 훅 생성
export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
}
