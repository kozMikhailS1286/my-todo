import React from 'react';
import Task from "./Task";

type Props = {
    todolists: any
    tasks: any
}


const Todolist = (props: Props) => {

    let tasksForTodolist = props?.tasks


    return <div>

        <span> {props.todolists.title} </span>

        {   tasksForTodolist &&
            tasksForTodolist.map((t: any) => <Task key={t.id}
                                                    task={t}
            />
            )
        }

    </div>
}

export default Todolist;