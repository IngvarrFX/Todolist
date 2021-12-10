import React, {ChangeEvent, useCallback} from "react"
import {EditableSpan} from "./EditableSpan"
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import {ITaskType, TaskStatuses} from "./api/tasks-api";
import {StatusAppType} from "./state/app-reducer";
import {CircularProgress} from "@mui/material";


type TaskPropsType = {
    task: ITaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    taskStatus?: StatusAppType
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);


    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
            disabled={props.taskStatus === "loading"}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}  disabled={props.taskStatus === "loading"}/>
        <IconButton onClick={onClickHandler} disabled={props.taskStatus === "loading"}>
            <Delete/>
        </IconButton>
        {props.taskStatus === "loading" && <CircularProgress size={"15px"}/>}
    </div>
})
