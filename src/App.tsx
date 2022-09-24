import Header from "./components/Header";
import {
  UserContext,
  UserDispatchContext,
  userReducer,
} from "./state/UserContext";
import { useReducer } from "react";
import TodoContainer from "./components/TodoContainer";

function App() {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        <Header />
        <TodoContainer />
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
