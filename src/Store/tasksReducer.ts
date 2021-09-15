import {v1} from "uuid";
import {ADD_TODOLIST, AddTodolistACType, todolistId1, todolistId2} from "./todolistsReducer";


export const ADD_TASK = "ADD_TASK"
export const REMOVE_TASK = "REMOVE_TASK"
export const CHANGE_TITLE_TASK = "CHANGE_TITLE_TASK"
export const CHANGE_STATUS_TASK = "CHANGE_STATUS_TASK"


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type InitialStateType = {
    [key: string]: Array<TaskType>
}

type ActionType = AddTaskACType | RemoveTaskACType |ChangeTitleTaskACType |ChangeStatusTaskACType |AddTodolistACType



const initialState:InitialStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}


export const tasksReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {...state,[action.todolistId]:[...state[action.todolistId].filter( t => t.id !== action.taskId)]}
        }
        case ADD_TASK: {
            return {...state, [action.todolistId]: [...state[action.todolistId], {id: v1(), title: action.title, isDone: false}]}
        }
        case CHANGE_TITLE_TASK:{
            return {...state, [action.todolistId]: [...state[action.todolistId].map(t => t.id === action.taskId? {...t, title: action.title}: t)]}
        }
        case CHANGE_STATUS_TASK:{
            return {...state, [action.todolistId]: [...state[action.todolistId].map(t => t.id === action.taskId? {...t, isDone: action.isDone}: t)]}
        }
        case ADD_TODOLIST:{
            return {...state, [action.todolistId]: []}
        }
    }
    return state
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: REMOVE_TASK, todolistId, taskId} as const)


type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => ({type: ADD_TASK, title, todolistId} as const)


type ChangeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>
export const changeTitleTaskAC = (title: string, todolistId: string, taskId: string) => ({type: CHANGE_TITLE_TASK, title, todolistId, taskId} as const)

type ChangeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
export const changeStatusTaskAC = (isDone: boolean, todolistId: string, taskId: string) => ({type: CHANGE_STATUS_TASK, isDone, todolistId, taskId} as const)