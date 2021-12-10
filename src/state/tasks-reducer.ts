import {AddTodolistActionType, RemoveTodolistActionType} from "./todo-lists-reducer";
import {Dispatch} from "redux";
import {ITaskType, tasksAPI, TaskStatuses} from "../api/tasks-api";
import {setErrorAppAC, setStatusAppAC, StatusAppType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errors-utils";
import {AppDispatch, AppRootStateType} from "./store";
import {ThunkAction} from "redux-thunk";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK",
    data: ITaskType
    todoId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    todolistId: string
    taskId: string
    title: string
}
export type SetTasksActionType = {
    type: "SET-TASKS",
    data: Array<ITaskType>
    todoId: string
}
export type SetTaskStatusActionType = {
    type: "SET-TASK_STATUS",
    taskStatus: StatusAppType
    todoId: string
    taskId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType
    | SetTaskStatusActionType

const initialState: TasksStateType = {}


export type TasksStateType = {
    [key: string]: Array<ITasksType>
}

export interface ITasksType extends ITaskType {
    taskStatus: StatusAppType
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.data.todoListId]: [{...action.data, taskStatus: "idle"}, ...state[action.data.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            };
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            };
        }
        case "ADD-TODOLIST": {
            return {...state, [action.data.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TASKS": {
            return {...state, [action.todoId]: action.data.map(t => ({...t, taskStatus: "idle"}))}
        }
        case "SET-TASK_STATUS": {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {
                    ...t,
                    taskStatus: action.taskStatus
                } : t)
            }
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (data: ITaskType, todoId: string): AddTaskActionType => {
    return {type: "ADD-TASK", data, todoId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", title, todolistId, taskId}
}
export const setTasksAC = (data: Array<ITaskType>, todoId: string): SetTasksActionType => {
    return {type: "SET-TASKS", data, todoId}
}
export const setTasksStatusAC = (taskStatus: StatusAppType, todoId: string, taskId: string): SetTaskStatusActionType => {
    return {type: "SET-TASK_STATUS", taskStatus, todoId, taskId}
}


export const GetTasksThunkCr = (todoId: string): ThunkTaskType => async (dispatch: AppDispatch) => {
    let res = await tasksAPI.getTasks(todoId)
    try {
        dispatch(setTasksAC(res.data.items, todoId))
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }
}
export const AddTaskThunkCr = (todoId: string, title: string): ThunkTaskType => (dispatch: AppDispatch) => {
    dispatch(setStatusAppAC("loading"))
    tasksAPI.createTasks(todoId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item, todoId))
                dispatch(setStatusAppAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        }).finally(() => {
        dispatch(setStatusAppAC("succeeded"))
    })
}
export const UpdateTaskTitleThunkCr = (taskId: string, title: string, todoId: string): ThunkTaskType => async (dispatch: AppDispatch) => {
    dispatch(setStatusAppAC("loading"))
    let res = await tasksAPI.updateTasks(todoId, taskId, title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(changeTaskTitleAC(taskId, title, todoId))
            dispatch(setStatusAppAC("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }
}

export const RemoveTaskThunkCr = (todoId: string, taskId: string): ThunkTaskType => async (dispatch: AppDispatch) => {
    dispatch(setStatusAppAC("loading"))
    dispatch(setTasksStatusAC("loading", todoId, taskId))
    let res = await tasksAPI.deleteTasks(todoId, taskId)
    try {
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(taskId, todoId))
            dispatch(setStatusAppAC("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }
}


//thunks type
type ThunkTaskType = ThunkAction<void, AppRootStateType, unknown, ActionsType>
