import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoApp from "./components/Todo App";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import './App.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='Redux-Todo-List/' element={<TodoApp />} />
            <Route path='Redux-Todo-List/login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />

          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
