import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../state/UserContext";
import { getTodos, saveTodo } from "../utils/storage";
import { TodoItem as TodoItemType } from "../utils/types";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";

function TodoContainer() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const loadTodos = async () => {
      if (localStorage) {
        try {
          const savedTodos = await getTodos(user);
          console.log(savedTodos);
          setTodos(savedTodos);
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadTodos().catch((error) => console.error(error));
  }, [user]);

  const checkTodo = (title: string, check: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.title === title) {
        return { ...todo, completed: check };
      }
      return todo;
    });
    console.log(newTodos);
    setTodos(newTodos);
  };

  const removeTodo = (title: string) => {
    const newTodos = todos.filter((todo) => todo.title !== title);
    setTodos(newTodos);
  };

  const addTodo = async (title: string) => {
    const id = await saveTodo(user, { title, completed: false });
    const newTodos = [...todos, { id, title, completed: false }];
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
