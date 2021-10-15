import React, {useEffect, useState} from "react"
import {tasksAPI} from "../../../api/tasks-api";


export default {
    title: "Tasks-API"
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const getTasks = () => {
        tasksAPI.getTasks(todolistID)
            .then(({data}) => {
                debugger
                setState(data.items);
            })
        setTodolistID("")
    }
    return (
        <div>
            <input value={todolistID} placeholder={"todolistID"} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>Get tasks</button>
            <hr/>
            {JSON.stringify(state)}
        </div>
    )
}


export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const createTask = () => {
        tasksAPI.createTasks(todolistID, title).then((res) => {
            setState(res.data.data.item);
        })
        setTodolistID("")
        setTitle("")
    }
    return (
        <div>
            <input value={todolistID} placeholder={"todolistID"} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <input value={title} placeholder={"title"} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>Create task</button>
            <hr/>
            {JSON.stringify(state)}
        </div>
    )
}


export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const [taskID, setTaskID] = useState<string>("")
    const deleteTask = () => {
        tasksAPI.deleteTasks(todolistID, taskID)
            .then((res) => {
                debugger
                setState(res.data)
            })
        setTodolistID("")
        setTaskID("")
    }
    return (
        <div>
            <input value={todolistID} placeholder={"todolistID"} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <input value={taskID} placeholder={"taskID"} onChange={(e) => {
                setTaskID(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>Delete task</button>
            <hr/>
            {JSON.stringify(state)}
        </div>
    )
}


export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const [taskID, setTaskID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const changeTaskTitle = () => {
        tasksAPI.updateTasks(todolistID, taskID, title)
            .then((res) => {
                setState(res.data)
            })
        setTodolistID("")
        setTaskID("")
        setTitle("")
    }
    return (
        <div>
            <input value={todolistID} placeholder={"todolistID"} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <input value={taskID} placeholder={"taskID"} onChange={(e) => {
                setTaskID(e.currentTarget.value)
            }}/>
            <input value={title} placeholder={"title"} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={changeTaskTitle}>Change task title</button>
            <hr/>
            {JSON.stringify(state)}
        </div>
    )
}
