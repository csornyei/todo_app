import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../state/UserContext";
import { TodoItem as TodoItemType } from "../utils/types";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";

function TodoContainer() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const user = useContext(UserContext);


  const checkTodo = (title: string, check: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.title === title) {
        return { ...todo, completed: check };
      }
      return todo;
    setTodos(newTodos);
  };

  const removeTodo = (title: string) => {
    const newTodos = todos.filter((todo) => todo.title !== title);
    setTodos(newTodos);
  };

    setTodos(newTodos);
  };

  return (
    <main>
      <NewTodo addTodo={addTodo} />
      {todos.map(({ completed, title }) => (
        <TodoItem
          completed={completed}
          title={title}
          key={title}
          changeTodo={checkTodo}
          removeTodo={removeTodo}
        />
      ))}
    </main>
  );
}

export default TodoContainer;
