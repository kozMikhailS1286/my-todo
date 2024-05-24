import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY" : "314b0124-4f3e-420a-9aac-2a8ba6dd682b",
    }
})

export const todolistApi = {
    getTodolist() {
        return instance.get("/todo-lists")
    },
    getTask(todilistId: string) {
        return instance.get(`/todo-lists/${todilistId}/tasks`)
    },
    addTodolist(title: string) {
        return instance.post(`/todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`/todo-lists/${todolistId}`)
    },
    addTask(todolistId: string, title: string) {
        console.log("Add Task in Api")
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    }
}