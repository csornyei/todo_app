const { createContext } = require("react");

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

export function userReducer(state, action) {
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

export function signInAction(dispatch, user) {
  dispatch({
    type: "signin",
    user,
  });
}

export function signOutAction(dispatch) {
  dispatch({
    type: "signout",
  });
}
