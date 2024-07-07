import { v4 as uuidv4 } from 'uuid';

import { TodoListType, FilterValuesType } from './../App';
import { AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC, todoListsReducer } from "./todolists-reducer";

test('correct todoList should be removed', () => {
    let todoListId1 = uuidv4();
    let todoListId2 = uuidv4();

    const startState: Array<TodoListType> = [
        { id: todoListId1, title: 'What to learn', filter: 'all' },
        { id: todoListId2, title: 'What to buy', filter: 'all' }
    ]

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todoList should be added', () => {
    let todoListId1 = uuidv4();
    let todoListId2 = uuidv4();

    let newTodoListTitle = 'New TodoList'

    const startState: Array<TodoListType> = [
        { id: todoListId1, title: 'What to learn', filter: 'all' },
        { id: todoListId2, title: 'What to buy', filter: 'all' }
    ]

    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('all');
})

test('correct todoList should be change its name', () => {
    let todoListId1 = uuidv4();
    let todoListId2 = uuidv4();

    let newTodoListTitle = 'New TodoList'

    const startState: Array<TodoListType> = [
        { id: todoListId1, title: 'What to learn', filter: 'all' },
        { id: todoListId2, title: 'What to buy', filter: 'all' }
    ]

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todoListId2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
})

test('correct filter of todoList should be changed', () => {
    let todoListId1 = uuidv4();
    let todoListId2 = uuidv4();

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodoListType> = [
        { id: todoListId1, title: 'What to learn', filter: 'all' },
        { id: todoListId2, title: 'What to buy', filter: 'all' }
    ]

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(todoListId2, newFilter))

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
})