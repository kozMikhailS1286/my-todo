import React from 'react';
import Task from "./Task";
import {deleteTodolistTC} from "./todolist-reducer";
import {useDispatch} from "react-redux";

type Props = {
    todolists: any
    tasks: any
}


const Todolist = (props: Props) => {
    const dispatch = useDispatch()

    let tasksForTodolist = props?.tasks
    console.log(props.todolists.id)
    const deleteTodolist = (todolistId: string) => {
        console.log("deleteTodolist")
        dispatch(deleteTodolistTC(todolistId))
    }

    return <div>

        <span> {props.todolists.title} </span>
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