import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodolistsTC} from "./todolist-reducer";
import Todolist from "./Todolist";


const Todolists = () => {


    const todolists = useSelector((state: any) => state.todolist)
    const tasks = useSelector((state: any) => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return <div>
            <span>1111</span>
            {
                todolists &&
                todolists.map((tl: any) => {
                    let allTodolistTasks = tasks ?  tasks[tl?.id] : []
                    return <div key={tl.id}>
                        <Todolist
                            key={tl.id}
                            todolist={tl}
                            tasks={allTodolistTasks}
                        />
                    </div>
                })
            }
        </div>
}

export default Todolists;