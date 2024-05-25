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

type ActionType = ReturnType<typeof setTasksAC> | ReturnType<typeof addTaskAC> | AddTodolistActionType |
    ReturnType<typeof deleteTaskAC>

const initialState: TasksStateType = {}
console.log(initialState)
export const taskReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'ADD-TODOLIS':
            return {...state, [action.todo.id]: []}
        case "DELETE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
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
    return (dispatch: AppThunkDispatch) => {
        todolistApi.addTask(todolistId, taskTitle)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}


export const deleteTaskAC = (todolistId: string, taskId: string) => ({type: "DELETE-TASK", todolistId, taskId} as const)


export const deleteTaskTC = (todolistId: string, taskId: string) => {
    console.log("Del Task in TC")
    return (dispatch: AppThunkDispatch) => {
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(deleteTaskAC(todolistId, taskId))
            })
    }
}