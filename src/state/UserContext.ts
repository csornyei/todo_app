import { createContext, Dispatch } from "react";
import { User } from "firebase/auth";

type UserAction = {
  type: "signin" | "signout";
  user?: any;
};

export const UserContext = createContext<User | null>(null);
export const UserDispatchContext = createContext<Dispatch<UserAction> | null>(
  null
);

export function userReducer(state: User, action: UserAction) {
  switch (action.type) {
    case "signin":
      return action.user;
    case "signout":
      return null;
    default:
      console.error("Unknown action: ", action.type);
      return state;
  }
}

export function signInAction(dispatch: Dispatch<UserAction>, user: User) {
  dispatch({
    type: "signin",
    user,
  });
}

export function signOutAction(dispatch: Dispatch<UserAction>) {
  dispatch({
    type: "signout",
  });
}
