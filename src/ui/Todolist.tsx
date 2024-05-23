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