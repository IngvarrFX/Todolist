import {todoListsAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setErrorAppAC, setStatusAppAC} from "./app-reducer";


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    data: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: "SET-TODOLISTS",
    data: Array<TodolistType>
}

export type ChangeTodolistEntityStatusActionType = {
    type: "CHANGE_STATUS",
    payload: {
        todolistId: string,
        entityStatus: TodolistStatus
    }
}

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType

const initialState: Array<TodolistDomainType> = []


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistStatus = "idle" | "loading" | "succeeded" | "failed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: TodolistStatus
}

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{...action.data, filter: "all", entityStatus: "idle"}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "SET-TODOLISTS": {
            return action.data.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        }
        case "CHANGE_STATUS": {
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl)
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (data: TodolistType): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", data}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}
export const setTodolistsAC = (data: Array<TodolistType>): SetTodolistsActionType => {
    return {type: "SET-TODOLISTS", data}
}
export const changeTodolistEntityStatusAC = (payload: { todolistId: string, entityStatus: TodolistStatus }): ChangeTodolistEntityStatusActionType => ({
    type: "CHANGE_STATUS",
    payload
} as const)


export const GetTodoListsThunkCr = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC("loading"))
    const todos = await todoListsAPI.getTodolist()
    try {
        dispatch(setTodolistsAC(todos.data))
        dispatch(setStatusAppAC("succeeded"))

    } catch (error) {
        dispatch(setErrorAppAC(error))
        dispatch(setStatusAppAC("failed"))
    }
}

export const AddTodolistThunkCr = (title: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC("loading"))
    const todos = await todoListsAPI.createTodolist(title)
    try {
        if (todos.data.resultCode === 0) {
            dispatch(addTodolistAC(todos.data.data.item))
            dispatch(setStatusAppAC("succeeded"))
        } else {
            dispatch(setErrorAppAC(todos.data.messages[0]))
            dispatch(setStatusAppAC("failed"))
        }

    } catch (error) {
        console.log(error)
        dispatch(setStatusAppAC("failed"))
    }
}

export const RemoveTodoListThunkCr = (todoId: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC("loading"))
    dispatch(changeTodolistEntityStatusAC({todolistId: todoId, entityStatus: "loading"}))
    const todos = await todoListsAPI.deleteTodolist(todoId)
    try {
        if (todos.data.resultCode === 0) {
            dispatch(removeTodolistAC(todoId))
            dispatch(setStatusAppAC("succeeded"))
        } else {
            dispatch(setErrorAppAC(todos.data.messages[0]))
            dispatch(setStatusAppAC("failed"))
        }
    } catch (error) {
        console.log(error)
        dispatch(setStatusAppAC("failed"))
    }
}

export const UpdateTodoListThunkCr = (title: string, todoId: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC("loading"))
    const todos = await todoListsAPI.updateTodolist(todoId, title)
    try {
        if (todos.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(todoId, title))
            dispatch(setStatusAppAC("succeeded"))
        } else {
            dispatch(setErrorAppAC(todos.data.messages[0]))
            dispatch(setStatusAppAC("failed"))
        }
    } catch (error) {
        console.log(error)
        dispatch(setStatusAppAC("failed"))
    }
}

