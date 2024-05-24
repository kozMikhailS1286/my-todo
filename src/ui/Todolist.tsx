import React from 'react';
import Task from "./Task";
import {deleteTodolistTC, TodolistsType} from "./todolist-reducer";
import {useDispatch} from "react-redux";
import {TaskType} from "./task-reducer";
import {AppThunkDispatch} from "../api/store";

type Props = {
    todolists: TodolistsType
    tasks: Array<TaskType>
}


const Todolist = (props: Props) => {
    const dispatch = useDispatch<AppThunkDispatch>()

    let tasksForTodolist = props?.tasks
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }

    return <div>
        <button onClick={()=>deleteTodolist(props.todolists.id)}> Delete todolist </button>
        {   tasksForTodolist &&
            tasksForTodolist.map((t: any) => <Task key={t.id}
                                                    task={t}
            />
            )
        }
    </div>
}

export default Todolist;