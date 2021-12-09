import {authAPI, RequestDataType} from "../api/auth-api";
import {Dispatch} from "redux";

const initialState: InitialStateType = {
    isLogin: false,
    initializedApp: false,
    statusApp: "idle",
    error: null,
}

//const's
const SET_IS_LOGIN = "SET_IS_LOGIN"
const SET_INITIALIZED = "SET_INITIALIZED"
const SET_STATUS = "SET_STATUS"
const SET_ERROR = "SET_ERROR"


export const AppReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGIN: {
            return {...state, isLogin: action.value}
        }
        case SET_INITIALIZED: {
            return {...state, initializedApp: action.value}
        }
        case SET_STATUS: {
            return {...state, statusApp: action.status}
        }
        case "SET_ERROR":{
            return {...state, error: action.error}
        }
        default:
            return state
    }
}


//actions
export const isAuthAC = (value: boolean): IsAuthACType => ({type: SET_IS_LOGIN, value} as const)
export const initializedAppAC = (value: boolean): InitializedAppACType => ({type: SET_INITIALIZED, value} as const)
export const setStatusAppAC = (status: StatusAppType): SetStatusAppACType => ({type: SET_STATUS, status} as const)
export const setErrorAppAC = (error: string | null): SetErrorAppACType => ({type: SET_ERROR, error} as const)


//types
type IsAuthACType = {
    type: typeof SET_IS_LOGIN,
    value: boolean
}
type InitializedAppACType = {
    type: typeof SET_INITIALIZED,
    value: boolean
}
export type SetStatusAppACType = {
    type: typeof SET_STATUS,
    status: StatusAppType
}
export type SetErrorAppACType = {
    type: typeof SET_ERROR,
    error: null | string
}

export const SignInThunkCr = (data: any) => async (dispatch: Dispatch) => {
    const res = await authAPI.login(data)
    try {
        if (res.data.resultCode === 0) {
            dispatch(isAuthAC(true))
        }else{
            dispatch(setErrorAppAC(res.data.messages[0]))
        }
    } catch (error) {
        console.log(error)
    }
}
export const LogoutThunkCr = () => async (dispatch: Dispatch) => {
    const res = await authAPI.logout()
    try {
        dispatch(isAuthAC(false))
    } catch (error) {
        console.log(error)
    }
}
export const AuthMeThunkCr = () => async (dispatch: Dispatch) => {
    const res = await authAPI.authMe()
    try {
        if (res.data.resultCode === 0) {
            dispatch(isAuthAC(true))
            dispatch(initializedAppAC(true))
            dispatch(setStatusAppAC("succeeded"))
        } else {
            dispatch(setErrorAppAC(res.data.messages[0]))
            dispatch(setStatusAppAC("failed"))
            dispatch(initializedAppAC(true))
        }
    } catch (error) {
        console.log(error)
    }
}


type ActionsType = IsAuthACType
    | InitializedAppACType
    | SetStatusAppACType
    | SetErrorAppACType

type InitialStateType = {
    statusApp: StatusAppType
    isLogin: boolean
    initializedApp: boolean
    error: null | string
}

export type StatusAppType = "idle" | "loading" | "succeeded" | "failed"
