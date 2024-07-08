import { AddTodoListActionType, RemoveTodoListActionType } from './todoLists-reducer';

import { TaskStateType } from "../App"
import { v4 as uuidv4 } from 'uuid';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}

type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}

type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todoListId: string
}

type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todoListId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType |
    ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = { ...state }
            const tasks = state[action.todoListId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks;

            return stateCopy;
        }

        case "ADD-TASK": {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todoListId];
            const newTask = {
                id: uuidv4(),
                title: action.title,
                isDone: false
            }
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newTasks;

            return stateCopy;
        }

        case "CHANGE-TASK-STATUS": {
            const stateCopy = { ...state }
            const todoListTasks = state[action.todoListId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone;
            }

            return stateCopy;
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = { ...state }
            const todoListTasks = state[action.todoListId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title;
            }

            return stateCopy;
        }

        case 'ADD-TODOLIST': {
            const stateCopy = { ...state }
            stateCopy[action.todoListId] = []

            return stateCopy;
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state };
            delete stateCopy[action.id]

            return stateCopy;
        }

        default:
            throw new Error('I don`t understand this action type')
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todoListId, taskId }
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return { type: "ADD-TASK", title, todoListId }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS", taskId, isDone, todoListId }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE", taskId, title, todoListId }
}

