import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../ui/todolist-reducer";
import {thunk} from "redux-thunk";
import {taskReducer} from "../ui/task-reducer";

const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: taskReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))