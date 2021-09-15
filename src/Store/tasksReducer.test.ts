import {v1} from "uuid";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    InitialStateType,
    removeTaskAC,
    tasksReducer,
} from "./tasksReducer";

test('should be remove task', ()=> {
    const initialState: InitialStateType = {
        'todolistId1': [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    //const keys = Object.keys(initialState[todolistId2].)
    const taksId = initialState['todolistId2'][0].id

    const action = removeTaskAC('todolistId2',taksId)
    const endState = tasksReducer(initialState,action)

    expect(endState['todolistId2'].length).toBe(1)
})



test('should be add task', ()=> {
    const initialState: InitialStateType = {
        'todolistId1': [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }



    const action = addTaskAC('Redux','todolistId2')
    const endState = tasksReducer(initialState, action)

    expect(endState['todolistId2'].length).toBe(3)

})


test('should be change title task', ()=> {
    const initialState: InitialStateType = {
        'todolistId1': [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    const taskId = initialState['todolistId2'][0].id

    const action = changeTitleTaskAC('Redux','todolistId2',taskId )
    const endState = tasksReducer(initialState, action)

    expect(endState['todolistId2'][0].title).toBe('Redux')

})


test('should be change status task', ()=> {
    const initialState: InitialStateType = {
        'todolistId1': [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    const taskId = initialState['todolistId2'][0].id

    const action = changeStatusTaskAC(false,'todolistId2',taskId )
    const endState = tasksReducer(initialState, action)

    expect(endState['todolistId2'][0].isDone).toBe(false)

})