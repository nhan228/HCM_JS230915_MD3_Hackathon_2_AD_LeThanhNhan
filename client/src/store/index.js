import { todoReducer } from "./slices/todo.slice";
import { userReducer } from "./slices/user.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        todoStore: todoReducer,
        userStore: userReducer
    }
})