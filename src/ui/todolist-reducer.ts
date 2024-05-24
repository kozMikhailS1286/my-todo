import {todolistApi} from "../api/todolist-api";
import {fetchTasksTC} from "./task-reducer";
import {AppThunkDispatch} from "../api/store";

export type TodolistsType = {
    id: string,
    "title": string
    addedDate: string
    order: number
}

type ActionType = ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>


const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map((tl: any) => ({...tl}))
        case 'ADD-TODOLIS':
            return [{...action.todo}, ...state]
        case 'DELETE-TODOLIST':
            return state.filter((tl: any) => tl.id !== action.todolistId)
        default:
            return state
    }
}

export const setTodolistsAC = (todolists: Array<TodolistsType>) => ({type: 'SET-TODOLISTS', todolists} as const)

export const fetchTodolistsTC = () => {
    return (dispatch: AppThunkDispatch) => {
        todolistApi.getTodolist()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                return res.data
            })
            .then((res) => {
                res.forEach((tl: any) => {
                    dispatch(fetchTasksTC(tl.id))
                })
            })
    }
}

export const addTodolistAC = (todo: TodolistsType) => ({type: "ADD-TODOLIS", todo} as const)

export const addTodolistTC = (title: string): any => {
    return (dispatch: AppThunkDispatch) => {
        todolistApi.addTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const deleteTodolistAC = (todolistId: string) => ({type: "DELETE-TODOLIST", todolistId} as const)

export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(deleteTodolistAC(todolistId))
            })
    }
}