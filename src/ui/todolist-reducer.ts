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