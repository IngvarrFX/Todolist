import React, {useEffect, useState} from "react"
import {todoListsAPI} from "../../../api/todolist-api";


export default {
    title: "Todolist-API"
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    const getTodolists = () => {
        todoListsAPI.getTodolist()
            .then(({data}) => {
                setState(data);
            })
    }
    return (
        <div>
            <button onClick={getTodolists}>Get todolists</button>
            <hr/>
            {JSON.stringify(state)}
        </div>
    )
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const createTodolists = () => {
        todoListsAPI.createTodolist(title).then((res) => {
            setState(res.data);
        })
    }
    return (
        <div>
            <input value={title} placeholder={"title"} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolists}>Create todolists</button>
            <hr/>
            {JSON.stringify(state)}
        </div>
    )
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const deleteTodolist = () => {
        todoListsAPI.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <input value={todolistID} placeholder={"todolistID"} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolist}>Delete todolist</button>
            <hr/>
            {JSON.stringify(state)}
        </div>
    )
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const changeTodolistTitle = () => {
        todoListsAPI.updateTodolist(todolistID, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <input value={todolistID} placeholder={"todolistID"} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <input value={title} placeholder={"title"} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={changeTodolistTitle}>Update todolist title</button>
            <hr/>
            {JSON.stringify(state)}
        </div>
    )
}
