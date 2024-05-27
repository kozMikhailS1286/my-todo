import React, {ChangeEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, TodolistsType} from "./todolist-reducer";
import Todolist from "./Todolist";
import s from "./Todolists.module.css"
import {AppRootStateType, useAppDispatch} from "../api/store";
import {TasksStateType} from "./task-reducer";


const Todolists = () => {

    const [title, setTitle] = useState("")
    const [changeChangeTitle, setChangeTitle] = useState("")
    const [editMode, setEditMode] = useState(false)

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>((state): any => state.tasks)


    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const changeOnChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeTitle(e.currentTarget.value)
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }


    const setEditTodolistTitle = (todolistId: string, changeChangeTitle: string) => {
        setEditMode(false)
        dispatch(changeTodolistTitleTC(todolistId, changeChangeTitle))
    }


    return <div className={s.todolistsContainer}>
        <h2> My todo: </h2>
        <input title={title} onChange={changeTitle}/>

        <button onClick={() => addTodolist(title)}> Add Todolist</button>

        {
            todolists?.map((tl: any, i: any) => {
                let allTodolistTasks = tasks ? tasks[tl?.id] : []
                return <div className={s.task} key={i}>
                    {editMode && <input onChange={changeOnChangeTitle}
                                        onBlur={()=>setEditTodolistTitle(tl.id, changeChangeTitle)}
                    />}
                     <span>{tl.title}</span>
                    <button onClick={()=>setEditMode(true)} > Edit Todolist Title </button>
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