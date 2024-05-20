import React from "react";

type Props = {
    task: any
}
const Task = (props: Props) => {

    return <div key={props.task.id}>
        <input value={props.task.title}/>
        </div>
}

export default Task;