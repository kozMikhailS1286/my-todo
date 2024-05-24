import React from "react";
import s from "./Task.module.css";
import {TaskType} from "./task-reducer";
import {TodolistsType} from "./todolist-reducer";

type Props = {
    todolists: TodolistsType
    task: TaskType
}
const Task = (props: Props) => {



    return <div className={s.taskContainer}>
    <div key={props.task.id}>
        <br/>
        <div>
            <span> {props.task.title} </span>
        </div>
    </div>
    </div>
}

export default Task;