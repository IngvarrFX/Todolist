import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todo-lists-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import {AppReducer} from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: AppReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof store.getState>
// Inferred type: {tasks: tasksReducer, todoLists: todoListsReducer, app: AppReducer}
export type AppDispatch = typeof store.dispatch
// определить автоматически тип всего объекта состояния
//export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
