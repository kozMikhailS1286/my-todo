import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTodolistTC, fetchTodolistsTC} from "./todolist-reducer";
import Todolist from "./Todolist";
import s from "./Todolists.module.css"


const Todolists = () => {

    const [title, setTitle] = useState("")

    const todolists = useSelector((state: any) => state.todolist)
    const tasks = useSelector((state: any) => state.tasks)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }


    return <div className={s.todolistsContainer}>
        <h2> My todo: </h2>
        <input title={title} onChange={changeTitle}/>

        <button onClick={() => addTodolist(title)}> Add Todolist</button>

        {
            todolists &&
            todolists.map((tl: any, i: any) => {
                let allTodolistTasks = tasks ? tasks[tl?.id] : []
                return <div className={s.task} key={i}>
                    <span>{tl.title}</span>
                    <Todolist
                        key={tl.id}
                        todolists={tl}
                        tasks={allTodolistTasks}
                    />
                </div>
            })
        }
    </div>
}

export default Todolists;