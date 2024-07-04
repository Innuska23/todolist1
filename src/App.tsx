import { useState } from 'react'
import './App.css'
import { TaskType, TodoList } from './сomponents/Todolist/TodoList'

import { v4 as uuidv4 } from 'uuid';
import { AddItemForm } from './сomponents/AddItemForm/AddItemForm';
import { title } from 'process';

export type FilterValuesType = 'all' | 'completed' | 'active'

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];

    let filteredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todoListId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todoListId: string) {
    let newTask = {
      id: uuidv4(),
      title: title,
      isDone: false
    }
    let tasks = tasksObj[todoListId];

    let newTasks = [newTask, ...tasks]
    tasksObj[todoListId] = newTasks;

    setTasks({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];

    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj })
    }
  }

  function changeTaskTitle(taskId: string, newValue: string, todoListId: string) {
    let tasks = tasksObj[todoListId];

    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.title = newValue;
      setTasks({ ...tasksObj })
    }
  }


  let todoListId1 = uuidv4();
  let todoListId2 = uuidv4();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' }
  ])

  let removeTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
    setTodoLists(filteredTodoList);

    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  }

  let changeTodoListTitle = (newTitle: string, todoListId: string,) => {

    const todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists])
    }
  }

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todoListId1]: [
      { id: uuidv4(), title: 'CSS&Html', isDone: true },
      { id: uuidv4(), title: 'JS', isDone: true },
      { id: uuidv4(), title: 'React', isDone: false },
      { id: uuidv4(), title: 'TS', isDone: false }],
    [todoListId2]: [
      { id: uuidv4(), title: 'Book', isDone: false },
      { id: uuidv4(), title: 'Milk', isDone: true },
    ]
  })


  function addTodoList(title: string) {
    let todoList: TodoListType = {
      id: uuidv4(),
      filter: 'all',
      title: title,
    }
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasksObj,
      [todoList.id]: []
    })
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];
        if (tl.filter === 'completed') {
          tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
        }

        if (tl.filter === 'active') {
          tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
        }
        return <TodoList
          key={tl.id}
          id={tl.id}
          title={tl.title}
          tasks={tasksForTodoList}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeStatus}
          filter={tl.filter}
          removeTodoList={removeTodoList}
          changeTaskTitle={changeTaskTitle}
          changeTodoListTitle={changeTodoListTitle}
        />
      })}

    </div>
  )
}

export default App
