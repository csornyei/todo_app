import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { User } from "firebase/auth";
import FirebaseApp from "./firebase";
import { TodoItem } from "./types";

const LOCAL_STORAGE_TODO_KEY = "local_todos";

const db = getFirestore(FirebaseApp);

export async function saveTodo(user: User | null, todo: Partial<TodoItem>) {
  if (user) {
    const { uid } = user;
    if (!uid) {
      throw new Error("Can't save todo, user is not valid!");
    }
    todo.uid = uid;
    try {
      const result = await addDoc(collection(db, `todos/user/${uid}`), {
        ...todo,
      });
      saveLocalTodo(todo);
      return result.id;
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
      querySnapshot.forEach((doc) =>
        result.push({ ...(doc.data() as TodoItem), id: doc.id })
      );
      return result;
    } catch (error) {
      throw new Error("Can't get todo, error while getting!");
    }
  }
  return result;
}

function getLocalTodos() {
  const savedTodos = localStorage.getItem(LOCAL_STORAGE_TODO_KEY);
  if (!!savedTodos) {
    return JSON.parse(savedTodos) as TodoItem[];
  } else {
    return [];
  }
}

function saveLocalTodo(todo: Partial<TodoItem>) {
  const currentTodos = getLocalTodos();
  if (Object.keys(todo).indexOf("id") === -1 || !todo.id) {
    todo.id = `${currentTodos.length + 1}`;
  }
  currentTodos.push(todo as TodoItem);
  localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(currentTodos));
  return todo.id!;
}
