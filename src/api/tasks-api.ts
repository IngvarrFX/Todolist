import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1//todo-lists/",
    withCredentials: true,
    headers: {
        "API-KEY": "e5d849e4-d295-4a72-8071-9e5233e43fce"
    }
})


export type TaskType = {
    addedDate: string
    deadline: null
    description: null
    id: string
    order: number
    priority: number
    startDate: null
    status: number
    title: string
    todoListId: string
    completed: boolean
}

interface UpdateTaskType {
    title: string
    description: string
    completed:boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

type ItemType = {
    item: TaskType
}

type CreateTaskType<T = {}> = {
    data: T
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

interface ResponseType {
    error: null
    items: Array<TaskType>
    totalCount: number
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export const tasksAPI = {
    getTasks(todolistID: string) {
        return instance.get<ResponseType>(`${todolistID}/tasks`)
    },
    createTasks(todolistID: string, title: string) {
        return instance.post<CreateTaskType<ItemType>>(`${todolistID}/tasks`, {title})
    },
    deleteTasks(todolistID: string, taskID: string) {
        return instance.delete<CreateTaskType>(`${todolistID}/tasks/${taskID}`)
    },
    updateTasks(todolistID: string, taskID: string, title: string) {
        return instance.put<CreateTaskType>(`${todolistID}/tasks/${taskID}`, {title})
    }
}



