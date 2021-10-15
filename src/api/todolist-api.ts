import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "e5d849e4-d295-4a72-8071-9e5233e43fce"
    }
})


type TodolistType = {
    id: string
    addadDate: string
    order: number
    title: string
}

type ItemType = {
    item: TodolistType
}

type CreateTodolistType<T = {}> = {
    data: T
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}


export const todolistsAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<CreateTodolistType>("todo-lists", {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<CreateTodolistType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<CreateTodolistType>(`todo-lists/${id}`, {title})
    }
}



