import {addTodolistAC, todolistId1, todolistId2, todolistsReducer, TodolistType} from "./todolistsReducer";
import {v1} from "uuid";
import {InitialStateType, tasksReducer} from "./tasksReducer";


test('should add new todolist and empty task',()=> {

    const todolists:Array<TodolistType>= [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const tasks:InitialStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }


    const action = addTodolistAC('New TL')
    const endTodolists = todolistsReducer(todolists, action)
    const endTasks = tasksReducer(tasks, action)
    const keys = Object.keys(endTasks)
    const idForTasks = keys[2]
    const idForTodolists = endTodolists[2].id


    expect(endTodolists.length).toBe(3)
    expect(idForTasks).toBe(action.todolistId)
    expect(idForTodolists).toBe(action.todolistId)

})