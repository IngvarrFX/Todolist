import React, {useEffect} from "react"
import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Login} from "./Login/Login";
import {Route, Routes} from "react-router-dom";
import {TodoLists} from "./TodoLists/TodoLists";
import {AuthMeThunkCr, LogoutThunkCr, StatusAppType} from "./state/app-reducer";
import {CircularProgress} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {ProgressBar} from "./componets/ProgressBar";


function App() {
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initializedApp)
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.app.isLogin)
    const status = useSelector<AppRootStateType, StatusAppType>(state => state.app.statusApp)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthMeThunkCr())
    }, [])

    if (!initialized) {
        return <div
            style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }

    const logoutHandler = () => {
        dispatch(LogoutThunkCr())
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLogin && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                </Toolbar>
                <div className={"progressBar"}>
                    {status === "loading" && <ProgressBar/>}
                </div>
            </AppBar>
            <Routes>
                <Route path={"/"} element={<TodoLists/>}/>
                <Route path={"/todolists"} element={<TodoLists/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
            </Routes>
        </div>
    );
}

export default App;
