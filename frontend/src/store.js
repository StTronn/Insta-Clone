import React, { useReducer } from "react";

export const Store = React.createContext();

const initialState = {
  counter: 0,
  user: JSON.parse(localStorage.getItem("user")) || false,
  allPostsObj: { posts: [], error: false },
};

function reducer(state, action) {
  console.log("reducer");
  switch (action.type) {
    case "INC_COUNTER":
      return { ...state, counter: state.counter + 1 };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "GET_POSTS":
      return { ...state, allPostsObj: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
