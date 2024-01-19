import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from "react-redux";
import {toggleCompletedTodo} from "../features/todo/todoSlice";
import {removeTodo} from "../features/todo/todoSlice";
import {changeTodo} from "../features/todo/todoSlice";

const EditTodo = ({text}) => {
    return (
        <input value={text}/>
    )
}

const TodoItem = ({todo}) => {
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(todo.text)
    const dispatch = useDispatch()
    const toggleTodoHandler = (id) => {
        dispatch(toggleCompletedTodo(id))
    }
    const removeTodoHandler = (id) => {
        dispatch(removeTodo(id))
    }
    useEffect(() => {
        let editTodo = {...todo, text}
        dispatch(changeTodo(editTodo))
    }, [text])
    return (
        <div className='flex justify-between items-center my-2'>
            <div
                className='text-sm px-4 py-2 cursor-pointer bg-lime-300 hover:bg-lime-400'
                onClick={() => toggleTodoHandler(todo.id)}
            >
                Complete
            </div>

            {!edit ?
                <div id='TodoText'
                     className={`text-sm ${todo.completed ? 'line-through font-medium text-lime-400' : ''}`}>
                    {todo.text}
                </div>
                :
                <input
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                />}

            <div className={`flex flex-end items-center gap-3`}>
                <div
                    onClick={(e) => {
                        setEdit(edit => !edit)
                    }}
                    className='text-sm px-4 py-2 flex bg-lime-400 hover:bg-lime-500 transition-all text-white cursor-pointer'>
                    {edit ? <p>Save</p> : <p>Edit</p>}
                </div>
                <div
                    onClick={() => removeTodoHandler(todo.id)}
                    className='text-sm px-4 py-2 flex bg-red-400 hover:bg-red-500 transition-all text-white cursor-pointer'>
                    Delete
                </div>
            </div>

        </div>
    )
}

export default TodoItem
