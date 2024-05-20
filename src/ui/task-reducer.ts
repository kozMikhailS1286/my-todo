import {todolistApi} from "../api/todolist-api";


const initialState: any = {}
export const taskReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
    }
    return state
}

export const setTasksAC = (tasks: any, todolistId: string) => ({type: "SET-TASKS", tasks, todolistId} as const)


export const fetchTasksTC = (todolistId: string): any => {
    return (dispatch: any) => {
        todolistApi.getTask(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}