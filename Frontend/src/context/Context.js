import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  /*useReducer takes two main arguments:
A reducer function: This function defines how the state should be updated when an action is dispatched. 
It takes the current state and an action as arguments and returns the new state.
An initial state: This is the initial value of the state. 
Here Reducer is the reducer function and thet INTIAL_STATE is the intial 
state.
This useReducer hook returns an array with two values:

1.The current state
2.A dispatch function.

To update the state, you dispatch actions using the dispatch function. 
An action is typically an object with a type property, which the reducer function uses to determine how to update the state.
ex : dispatch({type : "LOGIN_SUCCESS"})

When you dispatch an action, the reducer function is called with the current state and
the action. It returns a new state object, which becomes the current state, 
and your component is re-rendered with the updated state.
*/

  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
