import {todolistApi} from "../api/todolist-api";
import {AppRootStateType, AppThunkDispatch} from "../api/store";
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
    ReturnType<typeof deleteTaskAC> | ReturnType<typeof changeTaskTitleAC>

const initialState: TasksStateType = {}
export const taskReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case 'ADD-TODOLIS':
            return {...state, [action.todo.id]: []}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "DELETE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "EDIT-TASK-TITLE":
            console.log(state)
            console.log(action.model)
            debugger
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
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
    return (dispatch: AppThunkDispatch) => {
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(deleteTaskAC(todolistId, taskId))
            })
    }
}


const changeTaskTitleAC = (todolistId: string, taskId: string, model: any) => ({type: "EDIT-TASK-TITLE", todolistId, taskId, model} as const)



export const changeTaskTitleTC = (taskId: string, domainModel: any, todolistId: string) =>
    (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            return
        }

        const apiModel: any = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistApi.changeTaskTitle(todolistId, taskId, apiModel)
            .then(res => {
                    dispatch(changeTaskTitleAC(todolistId, taskId, apiModel ))
            })
    }