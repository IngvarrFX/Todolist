import {
    addTodolistAC,
    changeFilterTodolistAC,
    InitialStateType, removeTodolistAC,
    todolistId1,
    todolistId2,
    todolistsReducer, updateTodolistTitleAC
} from "./todolistsReducer";

test('should be add new todolist',() => {
    const initialState: InitialStateType = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const action = addTodolistAC('New todolist')
    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New todolist')
})





test('should be change filter todolist',() => {
    const initialState: InitialStateType = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const todolistId = initialState[0].id
    const action = changeFilterTodolistAC('active' ,todolistId)
    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('active')
})


test('should be update title todolist',() => {
    const initialState: InitialStateType = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const todolistId = initialState[1].id
    const action = updateTodolistTitleAC('New title' ,todolistId)
    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('New title')
})



test('should remove todolist',() => {
    const initialState: InitialStateType = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = removeTodolistAC(todolistId2)
    const endState = todolistsReducer(initialState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("What to learn")
})