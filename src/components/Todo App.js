import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo, logout, setToDos } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

import Button from "./Button";
import Spinner from "./Spinner";

function App() {
  const todos = useSelector((state) => state.todos);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleAddTodo = () => {
    if (text.trim() !== "") {
      if (editIndex !== null) {
        dispatch(editTodo(editIndex, text));
        setEditIndex(null);
      } else {
        dispatch(addTodo(text));
      }
      setText("");
    }
  };

  const handleEditTodo = (id, heading) => {
    setText(heading);
    setEditIndex(id);
  };

  useEffect(function () {
    const token = JSON.parse(localStorage.getItem("token"))
    console.log(token);
    if (!token) navigate('/Redux-Todo-List/login')
    async function getDATA() {

      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get('https://node-todo-server.onrender.com/api/v1/todos');
        console.log(res);
        dispatch(setToDos(res.data.data || []))
      } catch (error) {
        console.log(error)
      }
    }
    getDATA();
  }, [navigate, dispatch])

  return (
    <>
      <Button classname="logout-button" onclick={() => { dispatch(logout()); navigate('/Redux-Todo-List/login') }}>Log Out</Button>
      {loading ? <Spinner /> :
        <div className="app-container">
          <h1>Todo App using Redux</h1>
          <div className="input-container">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a new task..."
            />
            <Button classname="add-button" onclick={handleAddTodo}>{editIndex !== null ? "Edit" : "Add"}</Button>

          </div>
          <ul className="todo-list">
            {todos?.map((todo, index) => (
              <li key={index} className="todo-item">
                {editIndex === todo.id ? (
                  <input
                    type="text"
                    value={text} // Set the value to the current todo text
                    onChange={(e) => setText(e.target.value)}

                  />
                ) : (
                  <span className="todo-text">{todo.heading}</span>
                )}
                <div className="button-container">
                  {editIndex === todo.id ? (
                    <>
                      <Button classname="save-button" onclick={() => {
                        dispatch(editTodo(todo.id, text));
                        setEditIndex(null);
                        setText("");
                      }}>Save</Button>
                      <Button classname="cancel-button" onclick={() => {
                        setEditIndex(null);
                        setText("")
                      }}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button classname="edit-button" onclick={() => handleEditTodo(todo.id, todo.heading)}>Edit</Button>
                      <Button classname="delete-button" onclick={() => dispatch(deleteTodo(todo.id))}>Delete</Button>

                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>}
    </>
  );
}

export default App;
