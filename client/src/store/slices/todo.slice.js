import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        data: null,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
        addTodo: (state, action) => {
            state.data.push(action.payload)
        },
        updateTodo: (state, action) => {
            state.data = state.data.map((task) => {
                if (task.id == action.payload.id) {
                    return action.payload
                }
                return task
            })
        },
        deleteTodo: (state, action) => {
            state.data = state.data.filter(todo => todo.id != action.payload)
        },
    }
})

export const todoReducer = todoSlice.reducer;
export const todoAction = todoSlice.actions