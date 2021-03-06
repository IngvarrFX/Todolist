import React, {useCallback, useEffect} from "react"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task"
import {FilterValuesType, TodolistStatus} from "./state/todo-lists-reducer";
import {TaskStatuses} from "./api/tasks-api";
import {GetTasksThunkCr, ITasksType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    todoStatus: TodolistStatus
}

export const Todolist = React.memo((props: PropsType) => {
    const tasks = useSelector<AppRootStateType, Array<ITasksType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetTasksThunkCr(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id, props.changeFilter])


    let tasksForTodolist = tasks

    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    if (tasks === undefined) {
        return <Box sx={{display: "flex"}}>
            <CircularProgress size={"30px"}/>
        </Box>
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle} disabled={props.todoStatus === "loading"}/>
            <IconButton onClick={removeTodolist} disabled={props.todoStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} todoStatus={props.todoStatus}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                                                taskStatus={t.taskStatus!}
                />)
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button variant={props.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color={"inherit"}
            >All
            </Button>
            <Button variant={props.filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color={"primary"}>Active
            </Button>
            <Button variant={props.filter === "completed" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
                    color={"secondary"}>Completed
            </Button>
        </div>
    </div>
})


