import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from ".";

interface todo {
  id: number;
  status: boolean;
  text: string;
  disable: boolean;
}

interface editText {
  id: number;
  text: string;
}
const initialState: { todos: todo[] } = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    AddToDo: (state, action: PayloadAction<string>) => {
      state.todos = [
        ...state.todos,
        {
          id: state.todos[state.todos.length - 1]?.id + 1 || 0,
          status: false,
          text: action.payload,
          disable: true,
        },
      ];
    },
    RemooveToDo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
    ToggleStatus: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(({ id }) => id === action.payload);
      todo.status = !todo.status;
      state.todos = state.todos;
    },
    RemoveCompeleted: (state) => {
      state.todos = state.todos.filter(({ status }) => status !== true);
    },
    EditText: (state, action: PayloadAction<editText>) => {
      const todo = state.todos.find(({ id }) => id === action.payload.id);
      todo.text = action.payload.text;
      state.todos = state.todos;
    },
    ToggleDisable: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(({ id }) => id === action.payload);
      todo.disable = !todo.disable;
      state.todos = state.todos;
    },
  },
});

export const {
  AddToDo,
  RemooveToDo,
  ToggleStatus,
  RemoveCompeleted,
  EditText,
  ToggleDisable,
} = todoSlice.actions;

export const SelectTodosType = (state: RootStateType) => state.todos.todos;
