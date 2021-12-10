import {todoListsAPI, TodolistType} from "../api/todolist-api";
import {setStatusAppAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errors-utils";
import {AppDispatch, AppRootStateType} from "./store";
import {ThunkAction} from "redux-thunk";


const initialState: Array<TodolistDomainType> = []


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


//actions
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


export const GetTodoListsThunkCr = (): ThunkTodoType => async (dispatch: AppDispatch) => {
    dispatch(setStatusAppAC("loading"))
    await todoListsAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setStatusAppAC("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export const AddTodolistThunkCr = (title: string): ThunkTodoType => async (dispatch: AppDispatch) => {
    dispatch(setStatusAppAC("loading"))
    await todoListsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAppAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e) => {
            console.log(e)
            handleServerNetworkError(e.message, dispatch)
        })
}

export const RemoveTodoListThunkCr = (todoId: string): ThunkTodoType => async (dispatch: AppDispatch) => {
    dispatch(setStatusAppAC("loading"))
    dispatch(changeTodolistEntityStatusAC({todolistId: todoId, entityStatus: "loading"}))
    await todoListsAPI.deleteTodolist(todoId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todoId))
                dispatch(setStatusAppAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export const UpdateTodoListThunkCr = (title: string, todoId: string): ThunkTodoType => async (dispatch: AppDispatch) => {
    dispatch(setStatusAppAC("loading"))
    await todoListsAPI.updateTodolist(todoId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todoId, title))
                dispatch(setStatusAppAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}


//types thunks
type ThunkTodoType = ThunkAction<void, AppRootStateType, unknown, ActionsType>

//types
type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType


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


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistStatus = "idle" | "loading" | "succeeded" | "failed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: TodolistStatus
}
