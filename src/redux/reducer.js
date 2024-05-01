import { ADD_TODO, DELETE_TODO, EDIT_TODO, LOGOUT, SET_AUTHENTICATION, ADD_TODOS } from "./actions";
import axios from "axios";

async function getTodo() {
  try {
    const token = JSON.parse(localStorage.getItem("token"))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const res = await axios.get('https://todo-node.up.railway.app/api/v1/todos');
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}
const initialState = {
  todos: [], // Initialize the todos array
  token: JSON.parse(localStorage.getItem("token")) || "",
  isAuthenticated: JSON.parse(localStorage.getItem("token")) ? true : false
};



async function addToServer(todo) {
  try {
    const token = JSON.parse(localStorage.getItem("token"))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.post('https://todo-node.up.railway.app/api/v1/todos', { heading: todo, description: "Nothing" });
  } catch (error) {
    console.log(error)
  }
}
async function editToServer(text, id) {
  try {
    const token = JSON.parse(localStorage.getItem("token"))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.patch(`https://todo-node.up.railway.app/api/v1/todos/${id}`, { heading: text });
  } catch (error) {
    console.log(error)
  }
}
async function deleteToServer(id) {
  try {
    const token = JSON.parse(localStorage.getItem("token"))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.delete(`https://todo-node.up.railway.app/api/v1/todos/${id}`);
  } catch (error) {
    console.log(error)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case ADD_TODO:
      const newTodosAdd = [
        ...state.todos, { heading: action.payload.todo },

      ];
      addToServer(action.payload.todo)
      return {
        ...state,
        todos: newTodosAdd,
      };

    case DELETE_TODO:
      const newTodosDelete = state.todos.filter((todo) => todo.id !== action.payload.id);
      deleteToServer(action.payload.id)
      return {
        ...state,
        todos: newTodosDelete,
      };

    case EDIT_TODO:
      const newTodosEdit = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, heading: action.payload.text } : todo
      );
      editToServer(action.payload.text, action.payload.id)
      return {
        ...state,
        todos: newTodosEdit,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        initialState
      };
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
      };

    default:
      return state;
  }
};

export default reducer;
