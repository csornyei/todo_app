import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import FirebaseApp from "./firebase";
import { TodoItem } from "./types";

const LOCAL_STORAGE_TODO_KEY = "local_todos";

const db = getFirestore(FirebaseApp);

export async function saveTodo(user: User | null, todo: Partial<TodoItem>) {
  todo.local = true;
  if (user) {
    const { uid } = user;
    if (!uid) {
      throw new Error("Can't save todo, user is not valid!");
    }
    todo.local = false;
    todo.uid = uid;
    try {
      const result = await addDoc(collection(db, `todos/user/${uid}`), {
        ...todo,
      });
      todo.id = result.id;
    } catch (error) {
      console.error(error);
      throw new Error("Can't save todo, error while saving!");
    }
  }
  return saveLocalTodo(todo);
}

export async function getTodos(user: User | null) {
  const result = getLocalTodos();
  if (user) {
    const { uid } = user;
    if (!uid) {
      throw new Error("Can't get todo, user is not valid!");
    }
    try {
      const querySnapshot = await getDocs(collection(db, "todos", "user", uid));
      querySnapshot.forEach((doc) => {
        const localIndex = result.findIndex((item) => item.id === doc.id);
        if (localIndex !== -1) {
          result[localIndex] = {
            ...result[localIndex],
            ...doc.data(),
            local: false,
          };
        } else {
          result.push({
            ...(doc.data() as TodoItem),
            id: doc.id,
            local: false,
          });
        }
      });
    } catch (error) {
      throw new Error("Can't get todo, error while getting!");
    }
  }
  saveTodos(result);
  return result;
}

function saveTodos(todos: TodoItem[]) {
  localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(todos));
}

function getLocalTodos() {
  const savedTodos = localStorage.getItem(LOCAL_STORAGE_TODO_KEY);
  if (!!savedTodos) {
    return JSON.parse(savedTodos) as TodoItem[];
  } else {
    return [];
  }
}

function deleteLocalTodo(id: string) {
  const newTodos = getLocalTodos().filter((todo) => todo.id !== id);
  saveTodos(newTodos);
  return newTodos;
}

function saveLocalTodo(todo: Partial<TodoItem>) {
  const currentTodos = getLocalTodos();
  if (Object.keys(todo).indexOf("id") === -1 || !todo.id) {
    todo.id = `${currentTodos.length + 1}`;
  }
  currentTodos.push(todo as TodoItem);
  localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(currentTodos));
  return todo as TodoItem;
}

function checkLocalTood(todo: TodoItem) {
  const updatedTodo = getLocalTodos().map((item) => {
    if (item.id === todo.id) {
      item.completed = todo.completed;
    }
    return item;
  });
  saveTodos(updatedTodo);
  return updatedTodo;
}

export async function checkTodo(user: User | null, todo: TodoItem) {
  const { local, id, completed } = todo;
  if (!local && user) {
    const { uid } = user;
    if (!uid) {
      throw new Error("Can't delete todo, user is not valid!");
    }
    const docRef = doc(db, `todos/user/${uid}/${id}`);
    await updateDoc(docRef, {
      completed,
    });
  }
  return checkLocalTood(todo);
}

export async function deleteTodo(
  user: User | null,
  id: string,
  local: boolean
) {
  // TODO: mark for delete only!
  if (!local && user) {
    const { uid } = user;
    if (!uid) {
      throw new Error("Can't delete todo, user is not valid!");
    }
    await deleteDoc(doc(db, `todos/user/${uid}/${id}`));
  }
  return deleteLocalTodo(id);
}
