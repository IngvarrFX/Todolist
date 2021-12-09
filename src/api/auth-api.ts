import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "e5d849e4-d295-4a72-8071-9e5233e43fce"
    }
})


type ResponseType = {
    id: string
    email: string
    login: string
}

export type RequestDataType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export type ResponseUserType = {
    data: {id: number, login: string, email: string}
    fieldsErrors: []
    messages: []
    resultCode: 0
}

export type ResponseDataType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const authAPI = {
    authMe() {
        return instance.get<ResponseDataType>("auth/me")
    },
    login(data:RequestDataType) {
        return instance.post<ResponseDataType<RequestDataType>>("auth/login", data)
    },
    logout() {
        return instance.delete<ResponseDataType>("auth/login")
    },
}
