import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../state/UserContext";
import { checkTodo, deleteTodo, getTodos, saveTodo } from "../utils/storage";
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
          setTodos(savedTodos);
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadTodos().catch((error) => console.error(error));
  }, [user]);

  const onChangeTodo = async (todo: TodoItemType) => {
    const newTodos = await checkTodo(user, todo);
    setTodos(newTodos);
  };

  const removeTodo = async (id: string, local: boolean) => {
    const newTodos = await deleteTodo(user, id, local);
    setTodos(newTodos);
  };

  const addTodo = async (title: string) => {
    const todo = await saveTodo(user, { title, completed: false });
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  return (
    <main>
      <NewTodo addTodo={addTodo} />
      {todos.map((item) => (
        <TodoItem
          item={item}
          key={item.id}
          changeTodo={onChangeTodo}
          removeTodo={removeTodo}
        />
      ))}
    </main>
  );
}

export default TodoContainer;
