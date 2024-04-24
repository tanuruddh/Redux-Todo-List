import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./actions";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [], // Initialize the todos array
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodosAdd = [
        ...state.todos,
        {
          todo: action.payload.todo,
        },
      ];
      localStorage.setItem("todos", JSON.stringify(newTodosAdd)); // Save todos to local storage
      return {
        ...state,
        todos: newTodosAdd,
      };

    case DELETE_TODO:
      const newTodosDelete = state.todos.filter((_, index) => index !== action.payload.index);
      localStorage.setItem("todos", JSON.stringify(newTodosDelete)); // Save todos to local storage
      return {
        ...state,
        todos: newTodosDelete,
      };

    case EDIT_TODO:
      const newTodosEdit = state.todos.map((item, index) =>
        index === action.payload.index ? { ...item, todo: action.payload.text } : item
      );
      localStorage.setItem("todos", JSON.stringify(newTodosEdit)); // Save todos to local storage
      return {
        ...state,
        todos: newTodosEdit,
      };

    default:
      return state;
  }
};

export default reducer;
