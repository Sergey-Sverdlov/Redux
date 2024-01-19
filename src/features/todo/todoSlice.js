import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    writable: true
}

export const todoSlice = createSlice({
        name: "todos",
        initialState,
        reducers: {
            addTodo: (state, action) => {
                state.todos.push(action.payload)
            },

            toggleCompletedTodo: (state, action) => {
                const toggleTodo = state.todos.find(todo => todo.id === action.payload)
                toggleTodo.completed = !toggleTodo.completed
            },
            removeTodo: (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload)
            },
            changeTodo : (state, action) => {
                console.log(action.payload.id, action.payload.text)
                const todo = state.todos.find(todo => todo.id === action.payload.id)
                todo.text = action.payload.text
            }
        }
    }
)

export const {addTodo, toggleCompletedTodo, removeTodo, changeTodo} = todoSlice.actions
export default todoSlice.reducer