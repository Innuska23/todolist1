import { TaskStateType, TodoListType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { addTodoListAC, todoListsReducer } from "./todoLists-reducer";

test('ids should be equals', () => {

    const startTasksState: TaskStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = addTodoListAC('new todoList')

    const endTaskState = tasksReducer(startTasksState, action)
    const endTodoListState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListState[0].id;

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})