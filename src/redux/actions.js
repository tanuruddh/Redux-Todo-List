export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const SET_TOKEN = "SET_TOKEN";
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const LOGOUT = "LOGOUT";
export const ADD_TODOS = "ADD_TODOS";

const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    todo: text
  },
});

const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: {
    id: id
  }
});

const editTodo = (id, text) => ({
  type: EDIT_TODO,
  payload: {
    id: id,
    text: text
  },
});

const logout = () => ({
  type: LOGOUT
});

const setAuthentication = () => ({
  type: SET_AUTHENTICATION,
  payload: {
    isAuthenticated: true
  }
})

const setToDos = (todos) => {
  return {
    type: ADD_TODOS,
    payload: { todos }
  }
}


export { addTodo, deleteTodo, editTodo, logout, setAuthentication, setToDos }