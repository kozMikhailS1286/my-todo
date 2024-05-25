import React, {ChangeEvent, useState} from 'react';
import Task from "./Task";
import {deleteTodolistTC, TodolistsType} from "./todolist-reducer";
import {addTaskTC, TaskType} from "./task-reducer";
import {useAppDispatch} from "../api/store";

type Props = {
    todolist: TodolistsType
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
        dispatch(addTaskTC(title, todolistId))
    }


    return <div>
        <input onChange={changeTitle} title={title}/>
        <button onClick={() => deleteTodolist(props.todolist.id)}> Delete todolist</button>
        <button onClick={() => addTask(title, props.todolist.id)}> Add Task</button>
        {
            tasksForTodolist?.map((t) => <Task key={t.id}
                                               task={t}
                />
            )
        }
    </div>
}

export default Todolist;