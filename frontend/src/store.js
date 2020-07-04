import React, { useReducer } from "react";

export const Store = React.createContext();

const initialState = {
  counter: 0,
};

function reducer(state, action) {
  console.log("reducer");
  switch (action.type) {
    case "INC_COUNTER":
      return { ...state, counter: state.counter + 1 };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
