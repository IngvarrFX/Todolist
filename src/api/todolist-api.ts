import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "e5d849e4-d295-4a72-8071-9e5233e43fce"
    }
})


export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ItemType = {
    item: TodolistType
}

export type ResponseTodolistType<T = {}> = {
    data: T
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}


export const todoListsAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<ItemType>>("todo-lists", {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseTodolistType<ItemType>>(`todo-lists/${id}`, {title})
    }
}



