import { FilterValuesType, TodoListType } from "../App"

import { v4 as uuidv4 } from 'uuid';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todoListId: string
}

type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TYPE',
    id: string,
    title: string
}

type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }

        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todoListId,
                title: action.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TYPE': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]
        }


        default:
            throw new Error('I don`t understand this action type')
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return { type: "REMOVE-TODOLIST", id: todoListId }
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return { type: "ADD-TODOLIST", title, todoListId: uuidv4() }
}

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return { type: "CHANGE-TODOLIST-TYPE", id: id, title: title }
}

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter }
} 