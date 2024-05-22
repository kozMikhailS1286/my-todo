import {todolistApi} from "../api/todolist-api";
import {fetchTasksTC} from "./task-reducer";


const initialState: Array<any> = []

export const todolistsReducer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map((tl: any) => ({...tl}))
        default:
            return state
    }
}

// actions
export const setTodolistsAC = (todolists: Array<any>) => ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
export const fetchTodolistsTC = (): any => {
    return (dispatch: any) => {
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

export const addTodolistAC = (title: string) => ({type: "ADD-TODOLIS", title} as const)

export const addTodolistTC = (title: string): any => {
    return (dispatch: any) => {
        todolistApi.addTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.items))
            })
    }
}

export const deleteTodolistAC = (todolistId: string) => ({type: "DELETE-TODOLIST", todolistId} as const)

export const deleteTodolistTC = (todolistId: string): any => {
    console.log("deleteTodolistTC")
    return (dispatch: any) => {
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(deleteTodolistAC(todolistId))
            })
    }
}