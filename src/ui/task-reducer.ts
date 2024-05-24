import {todolistApi} from "../api/todolist-api";
import {AppThunkDispatch} from "../api/store";

export type TaskType = {
    description: string
    title: string
    status: any
    priority: any
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type ActionType = ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}
export const taskReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
    }
    return state
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({type: "SET-TASKS", tasks, todolistId} as const)


export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: AppThunkDispatch) => {
        todolistApi.getTask(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}