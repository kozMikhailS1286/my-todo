import React, {ChangeEvent, useState} from "react";
import s from "./Task.module.css";
import {changeTaskTitleTC, deleteTaskTC, TaskType} from "./task-reducer";
import {useAppDispatch} from "../api/store";

type Props = {
    task: TaskType
}
const Task = (props: Props) => {

    const [editMode, setEditMode] = useState(false)
    const [changeChangeTitle, setChangeChangeTitle] = useState("")

    const dispatch = useAppDispatch();

    const changeOnChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeChangeTitle(e.currentTarget.value)
    }

    const setEditTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setEditMode(false)
        dispatch(changeTaskTitleTC(taskId, {title: newTitle}, todolistId))
    }

    const deleteTask = () => {
        dispatch(deleteTaskTC(props.task.todoListId, props.task.id))
    }

    return <div className={s.taskContainer}>
        <div key={props.task.id}>
            <br/>
            <div>
                { editMode && <input onChange={changeOnChangeTitle} onBlur={()=>setEditTaskTitle(props.task.todoListId, props.task.id, changeChangeTitle)}/> } <span> {props.task.title} </span>
                <button onClick={()=>setEditMode(true)}> Edit Task Title </button>
                <button onClick={() => deleteTask()}> Delete Task</button>
            </div>
        </div>
    </div>
}

export default Task;