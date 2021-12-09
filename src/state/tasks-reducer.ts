import {AddTodolistActionType, RemoveTodolistActionType} from "./todo-lists-reducer";
import {Dispatch} from "redux";
import {tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {setStatusAppAC, StatusAppType} from "./app-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK",
    data: TaskType
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
    data: Array<TaskType>
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
    [key: string]: Array<TasksType>
}

export type TasksType = {
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
    taskStatus: StatusAppType
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.data.todoListId]: [{...action.data, taskStatus: "idle"}, ...state[action.data.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.data.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TASKS": {
            return {...state, [action.todoId]: action.data}
        }
        case "SET-TASK_STATUS":{
            return{...state,[action.todoId]:state[action.todoId].map(t => t.id === action.taskId? {...t, taskStatus: action.taskStatus}: t)}
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (data: TaskType, todoId: string): AddTaskActionType => {
    return {type: "ADD-TASK", data, todoId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", title, todolistId, taskId}
}
export const setTasksAC = (data: Array<TasksType>, todoId: string): SetTasksActionType => {
    return {type: "SET-TASKS", data, todoId}
}
export const setTasksStatusAC = (taskStatus: StatusAppType,todoId: string,taskId: string ): SetTaskStatusActionType => {
    return {type: "SET-TASK_STATUS", taskStatus, todoId, taskId}
}


export const GetTasksThunkCr = (todoId: string) => async (dispatch: Dispatch) => {
    let tasks = await tasksAPI.getTasks(todoId)
    try {
        //@ts-ignore
        tasks = tasks.data.items.map(t => ({...t, taskStatus: "idle"}))
        //@ts-ignore
        dispatch(setTasksAC(tasks, todoId))
    } catch (error) {
        console.log(error)
    }
}
export const AddTaskThunkCr = (todoId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC("loading"))
    let task = await tasksAPI.createTasks(todoId, title)
    try {
        dispatch(addTaskAC(task.data.data.item, todoId))
        dispatch(setStatusAppAC("succeeded"))
    } catch (error) {
        console.log(error)
    }
}
export const UpdateTaskTitleThunkCr = (taskId: string, title: string, todoId: string,) => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC("loading"))
    let task = await tasksAPI.updateTasks(todoId, taskId, title)
    try {
        dispatch(changeTaskTitleAC(taskId, title, todoId))
        dispatch(setStatusAppAC("succeeded"))
    } catch (error) {
        console.log(error)
    }
}

export const RemoveTaskThunkCr = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC("loading"))
    dispatch(setTasksStatusAC("loading", todoId, taskId))
    let task = await tasksAPI.deleteTasks(todoId, taskId)
    try {
        dispatch(removeTaskAC(taskId, todoId))
        dispatch(setStatusAppAC("succeeded"))
    } catch (error) {
        console.log(error)
    }
}
