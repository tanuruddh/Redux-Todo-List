export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";

const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    todo: text
  },
});

const deleteTodo = (index) => ({
  type: DELETE_TODO,
  payload: {
    index:index
  }
});

const editTodo = (index, text) => ({
  type: EDIT_TODO,
  payload: {
    index: index,
    text:text
  },
});


export {addTodo, deleteTodo, editTodo}