import {Dispatch} from "redux";
import {ResponseTodolistType} from "../api/todolist-api";
import {setErrorAppAC, setStatusAppAC} from "../state/app-reducer";
import {AppDispatch} from "../state/store";

export const handleServerAppError = (data:ResponseTodolistType,dispatch: AppDispatch) => {
    if(data.messages.length){
        dispatch(setErrorAppAC(data.messages[0]))
        dispatch(setStatusAppAC("failed"))
    } else {
        dispatch(setErrorAppAC("Some error"))
        dispatch(setStatusAppAC("failed"))
    }
}


export const handleServerNetworkError = (errorMessage: string, dispatch: AppDispatch) => {
    dispatch(setErrorAppAC(errorMessage))
    dispatch(setStatusAppAC("failed"))
}
