import React, { useState } from "react";
import NewTodo from "./components/NewTodo";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import {
  UserContext,
  UserDispatchContext,
  userReducer,
} from "./state/UserContext";
import { useReducer } from "react";

function App() {
  const [user, dispatch] = useReducer(userReducer, null);
  const [todos, setTodos] = useState([]);

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

  const addTodo = (title) => {
    const newTodos = [...todos, { title, completed: false }];
    setTodos(newTodos);
  };

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        <Header />
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
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
