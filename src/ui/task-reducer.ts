import {todolistApi} from "../api/todolist-api";
import {AppThunkDispatch} from "../api/store";
import {AddTodolistActionType} from "./todolist-reducer";

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

type ActionType = ReturnType<typeof setTasksAC> | ReturnType<typeof addTaskAC> | AddTodolistActionType

const initialState: TasksStateType = {}
export const taskReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case "ADD-TASK":
            console.log({...state}, action.task.todoListId)
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'ADD-TODOLIS':
            return {...state, [action.todo.id]: []}
        default:
            return state
        }
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

export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)

export const addTaskTC = (taskTitle: string, todolistId: string) => {
    console.log("AddTask in TC")
    return (dispatch: AppThunkDispatch) => {
        todolistApi.addTask(todolistId, taskTitle)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}