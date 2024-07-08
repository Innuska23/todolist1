import { TaskStateType } from './../App';

import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer';
import { addTodoListAC, removeTodoListAC } from './todoLists-reducer';

test('correct task should be deleted from correct array', () => {

    const startState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: 'CSS&Html', isDone: true },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        'todoListId2': [
            { id: '1', title: 'Book', isDone: false },
            { id: '2', title: 'Milk', isDone: true },
            { id: '3', title: 'Tea', isDone: true },
        ]
    }

    const action = removeTaskAC('2', "todoListId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every(t => t.id != "2")).toBeTruthy()
})

test('correct task should be added from correct array', () => {

    const startState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: 'CSS&Html', isDone: true },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        'todoListId2': [
            { id: '1', title: 'Book', isDone: false },
            { id: '2', title: 'Milk', isDone: true },
            { id: '3', title: 'Tea', isDone: true },
        ]
    }

    const action = addTaskAC('juce', "todoListId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe('juce')
    expect(endState['todoListId2'][0].isDone).toBe(false)
})


test('status of specified task should be changed', () => {

    const startState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: 'CSS&Html', isDone: true },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        'todoListId2': [
            { id: '1', title: 'Book', isDone: false },
            { id: '2', title: 'Milk', isDone: true },
            { id: '3', title: 'Tea', isDone: true },
        ]
    }

    const action = changeTaskStatusAC('2', false, "todoListId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].isDone).toBe(false)
    expect(endState["todoListId1"][1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {

    const startState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: 'CSS&Html', isDone: true },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        'todoListId2': [
            { id: '1', title: 'Book', isDone: false },
            { id: '2', title: 'Milk', isDone: true },
            { id: '3', title: 'Tea', isDone: true },
        ]
    }

    const action = changeTaskTitleAC('2', "MilkyWay", "todoListId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].title).toBe("MilkyWay")
    expect(endState["todoListId1"][1].title).toBe('JS')
})

test('new property with new array should be added when new todoList is added', () => {

    const startState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: 'CSS&Html', isDone: true },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        'todoListId2': [
            { id: '1', title: 'Book', isDone: false },
            { id: '2', title: 'Milk', isDone: true },
            { id: '3', title: 'Tea', isDone: true },
        ]
    }

    const action = addTodoListAC('new todoList');
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todoList should be deleted', () => {

    const startState: TaskStateType = {
        'todoListId1': [
            { id: '1', title: 'CSS&Html', isDone: true },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        'todoListId2': [
            { id: '1', title: 'Book', isDone: false },
            { id: '2', title: 'Milk', isDone: true },
            { id: '3', title: 'Tea', isDone: true },
        ]
    }

    const action = removeTodoListAC('todoListId2');
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todoListId2']).toBeUndefined();
})