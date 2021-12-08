import {todoListsAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";


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

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> = []


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{...action.data, filter: "all"}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "SET-TODOLISTS": {
            return action.data.map(tl => ({...tl, filter: "all"}))
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


export const GetTodoListsThunkCr = () => async (dispatch: Dispatch) => {
    const todos = await todoListsAPI.getTodolist()
    try {
        dispatch(setTodolistsAC(todos.data))
    } catch (error) {
        console.log(error)
    }
}

export const AddTodolistThunkCr = (title: string) => async (dispatch: Dispatch) => {
    const todos = await todoListsAPI.createTodolist(title)
    try {
        dispatch(addTodolistAC(todos.data.data.item))
    } catch (error) {
        console.log(error)
    }
}

export const RemoveTodoListThunkCr = (todoId: string) => async (dispatch: Dispatch) => {
    const todos = await todoListsAPI.deleteTodolist(todoId)
    try {
        dispatch(removeTodolistAC(todoId))
    } catch (error) {
        console.log(error)
    }
}

export const UpdateTodoListThunkCr = (title: string, todoId: string) => async (dispatch: Dispatch) => {
    const todos = await todoListsAPI.updateTodolist(todoId, title)
    try {
        dispatch(changeTodolistTitleAC(todoId, title))
    } catch (error) {
        console.log(error)
    }
}

