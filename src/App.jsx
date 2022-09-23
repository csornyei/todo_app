import React from "react";
import { useState } from "react";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([
    { completed: true, title: "First item" },
    { completed: false, title: "Second item" },
    { completed: false, title: "Third item" },
    { completed: true, title: "Fourth item" },
  ]);

  const checkTodo = (title, check) => {
    const newTodos = todos.map((todo) => {
      if (todo.title === title) {
        return { ...todo, completed: check };
      }
      return todo;
    });
    console.log(newTodos);
    setTodos(newTodos);
  };

  const removeTodo = (title) => {
    const newTodos = todos.filter((todo) => todo.title !== title);
    setTodos(newTodos);
  };

  return (
    <div>
      {todos.map(({ completed, title }) => (
        <TodoItem
          completed={completed}
          title={title}
          key={title}
          changeTodo={checkTodo}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  );
}

export default App;
