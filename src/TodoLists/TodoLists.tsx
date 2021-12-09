import React, {useCallback, useEffect} from "react";
import {AddTaskThunkCr, changeTaskStatusAC, RemoveTaskThunkCr, UpdateTaskTitleThunkCr} from "../state/tasks-reducer";
import {TaskStatuses} from "../api/tasks-api";
import {
    AddTodolistThunkCr,
    changeTodolistFilterAC,
    FilterValuesType,
    GetTodoListsThunkCr,
    RemoveTodoListThunkCr,
    TodolistDomainType, TodolistStatus,
    UpdateTodoListThunkCr
} from "../state/todo-lists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "../Todolist";
import {useNavigate} from "react-router-dom";
import {StatusAppType} from "../state/app-reducer";
import {ShowError} from "../componets/ShowError";


export const TodoLists = () => {
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initializedApp)
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.app.isLogin)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(RemoveTaskThunkCr(todolistId, id));
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(AddTaskThunkCr(todolistId, title));
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = changeTaskStatusAC(id, status, todolistId);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(UpdateTaskTitleThunkCr(id, newTitle, todolistId));
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(RemoveTodoListThunkCr(id));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(UpdateTodoListThunkCr(title, id));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistThunkCr(title));
    }, [dispatch]);

    useEffect(() => {
        if (!isLogin) {
            navigate("/login")
        }
        dispatch(GetTodoListsThunkCr())
    }, [])


    if (!isLogin) {
        navigate("/login")
    }


    return <div>
        <Container fixed>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todoLists.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    todoStatus={tl.entityStatus}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </Container>
        {error && <ShowError/>}
    </div>
}
