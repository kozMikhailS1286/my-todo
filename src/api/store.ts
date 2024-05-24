import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../ui/todolist-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {taskReducer} from "../ui/task-reducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: taskReducer
})



// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))



export type AppRootStateType = ReturnType<typeof rootReducer>
// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();