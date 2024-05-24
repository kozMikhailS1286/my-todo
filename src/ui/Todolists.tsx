import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTodolistTC, fetchTodolistsTC, TodolistsType} from "./todolist-reducer";
import Todolist from "./Todolist";
import s from "./Todolists.module.css"
import {AppRootStateType, AppThunkDispatch, useAppDispatch} from "../api/store";
import {TasksStateType} from "./task-reducer";


const Todolists = () => {

    const [title, setTitle] = useState("")

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>((state): any => state.tasks)

    const dispatch = useAppDispatch()


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
            todolists?.map((tl: any, i: any) => {
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