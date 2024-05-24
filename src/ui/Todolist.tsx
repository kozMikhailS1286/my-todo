import React, {ChangeEvent, useState} from 'react';
import Task from "./Task";
import {deleteTodolistTC, TodolistsType} from "./todolist-reducer";
import {useDispatch} from "react-redux";
import {addTaskTC, TaskType} from "./task-reducer";
import {AppThunkDispatch, useAppDispatch} from "../api/store";

type Props = {
    todolists: TodolistsType
    tasks: Array<TaskType>
}


const Todolist = (props: Props) => {

    const [title, setTitle] = useState("")

    const dispatch = useAppDispatch();


    let tasksForTodolist = props?.tasks
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTask = (title: string, todolistId: string) => {
        console.log("AddTask in Component")
        dispatch(addTaskTC(title, todolistId))
    }

    return <div>
        <input onChange={changeTitle} title={title}/>
        <button onClick={()=>deleteTodolist(props.todolists.id)}> Delete todolist </button>
        <button onClick={()=>addTask(title, props.todolists.id)}> Add Task </button>
        {
            tasksForTodolist?.map((t: any) => <Task key={t.id}
                                                    task={t}
                                                   todolists={t.id}
            />
            )
        }
    </div>
}

export default Todolist;