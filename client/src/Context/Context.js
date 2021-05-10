import React, { createContext, useContext, useReducer } from "react";
import * as api from "./Api";
import { createAsyncDispatcher } from "./AsyncActionUtils";

const initialState = {
  item: {
    loading: false,
    data: null,
    error: null,
  }
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};
const success = (data) => ({
  loading: false,
  data,
  error: null,
});
const error = (error) => ({
  loading: false,
  data: null,
  error: error,
});

function SEReducer(state, action) {
  switch (action.type) {
    case "GET_ITEM":
      return {
        ...state,
        item: loadingState,
      };
    case "GET_ITEM_SUCCESS":
      return {
        ...state,
        item: success(action.data),
      };
    case "GET_ITEM_ERROR":
      return {
        ...state,
        item: error(action.error),
      };
    default:
      throw new Error(`Unhanded action type : ${action.type}`);
  }
}

const SEStateContext = createContext(null);
const SEDispatchContext = createContext(null);

export function SEProvider({ children }) {
  const [state, dispatch] = useReducer(SEReducer, initialState);
  return (
    <SEStateContext.Provider value={state}>
      <SEDispatchContext.Provider value={dispatch}>
        {children}
      </SEDispatchContext.Provider>
    </SEStateContext.Provider>
  );
}

export function useSEState() {
  const state = useContext(SEStateContext);
  if (!state) {
    throw new Error("Cannot find SEProvider");
  }
  return state;
}

export function useSEDispatch() {
  const dispatch = useContext(SEDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find SEProvider");
  }
  return dispatch;
}

export const getItem = createAsyncDispatcher("GET_ITEM",api.getItem);
