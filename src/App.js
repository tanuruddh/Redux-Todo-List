import React from "react";
import TodoApp from "./components/Todo App";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <TodoApp />
      </Provider>
    </>
  );
};

export default App;
