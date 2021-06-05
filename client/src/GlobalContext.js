import React, { useReducer, createContext, useContext } from "react";

const initState = {
  user: false,
  search: null,
  num: 0,
};

function StateReducer(state, action) {
  switch (action.type) {
    case "GET_USER":
      return {
        state,
      };
    case "TOGGLE_USER":
      return {
        ...state,
        user: !state.user,
      };
    case "SET_SEARCH":
      return {
        ...state,
        search: action.searchText,
      };
    case "GET_SEARCH":
      return {
        state,
      };
    case "GET_NUM":
      return {
        state,
      };
    case "SET_NUM":
      return {
        ...state,
        num: action.number,
      };
    default:
      throw new Error(`Unhanded action type : ${action.type}`);
  }
}

const GlobalStateContext = createContext(null);
const GlobalDispatchContext = createContext(null);
export function GlobalContext({ children }) {
  const [state, dispatch] = useReducer(StateReducer, initState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  return context;
}

export function useGlobalDispatch() {
  const context = useContext(GlobalDispatchContext);
  return context;
}
