import React from "react";
import s from "./Task.module.css";

type Props = {
    task: any
}
const Task = (props: Props) => {

    return <div className={s.taskContainer}>
    <div key={props.task.id}>
        <br/>
        <div>
            <input value={props.task.title}/>
        </div>
    </div>
    </div>
}

export default Task;