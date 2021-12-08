import {AddTodolistActionType, RemoveTodolistActionType} from "./todo-lists-reducer";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";
import {tasksAPI, TaskType} from "../api/tasks-api";

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
    isDone: boolean
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

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

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
            // const stateCopy = {...state}
            // const newTask: TaskType = {
            //     ...action.data
            // }
            // const tasks = stateCopy[action.data.todoListId];
            // const newTasks = [newTask, ...tasks];
            // stateCopy[action.data.todoListId] = newTasks;
            // return stateCopy;
            return {...state, [action.data.todoListId]: [action.data, ...state[action.data.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);

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
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", title, todolistId, taskId}
}
export const setTasksAC = (data: Array<TaskType>, todoId: string): SetTasksActionType => {
    return {type: "SET-TASKS", data, todoId}
}


export const GetTasksThunkCr = (todoId: string) => async (dispatch: Dispatch) => {
    let tasks = await tasksAPI.getTasks(todoId)
    try {
        dispatch(setTasksAC(tasks.data.items, todoId))
    } catch (error) {
        console.log(error)
    }
}
export const AddTaskThunkCr = (todoId: string, title: string) => async (dispatch: Dispatch) => {
    let task = await tasksAPI.createTasks(todoId, title)
    try {
        dispatch(addTaskAC(task.data.data.item, todoId))
    } catch (error) {
        console.log(error)
    }

}
