import {FilterValuesType} from "../App";

import {v1} from "uuid";


export const ADD_TODOLIST = "ADD_TODOLIST"
export const CHANGE_FILTER_TODOLIST = "CHANGE_FILTER_TODOLIST"
export const UPDATE_TODOLIST_TITLE = "UPDATE_TODOLIST_TITLE"
export const REMOVE_TODOLIST = "REMOVE_TODOLIST"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type InitialStateType = Array<TodolistType>

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: InitialStateType = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

type ActionType = AddTodolistACType |ChangeFilterTodolistACType |UpdateTodolistTitleACType |RemoveTodolistACType


export const todolistsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type){
        case ADD_TODOLIST:{
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        }
        case CHANGE_FILTER_TODOLIST:{
            return state.map(tl => tl.id === action.todolistId? {...tl, filter: action.value}: tl)
        }
        case UPDATE_TODOLIST_TITLE:{
            return state.map(tl => tl.id === action.todolistId? {...tl, title: action.title}: tl)
        }
        case REMOVE_TODOLIST:{
            return state.filter(tl => tl.id !== action.todolistId)
        }
    }
    return state
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => ({type: ADD_TODOLIST, title, todolistId: v1()} as const)

export type ChangeFilterTodolistACType = ReturnType<typeof changeFilterTodolistAC>
export const changeFilterTodolistAC = (value: FilterValuesType, todolistId: string) => ({type: CHANGE_FILTER_TODOLIST, value, todolistId} as const)

export type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const  updateTodolistTitleAC = (title: string, todolistId : string) => ({type: UPDATE_TODOLIST_TITLE,title, todolistId} as const)

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId:string) => ({type: REMOVE_TODOLIST, todolistId} as const)