import React from "react";
import s from "./Task.module.css";
import {deleteTaskTC, TaskType} from "./task-reducer";
import {useAppDispatch} from "../api/store";

type Props = {
    task: TaskType
}
const Task = (props: Props) => {
    const dispatch = useAppDispatch();
    const deleteTask = () => {
        dispatch(deleteTaskTC(props.task.todoListId, props.task.id))
    }

    return <div className={s.taskContainer}>
        <div key={props.task.id}>
            <br/>
            <div>
                <span> {props.task.title} </span>
                <button onClick={() => deleteTask()}> Delete Task</button>
            </div>
        </div>
    </div>
}

export default Task;