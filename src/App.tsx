import { useState } from 'react'
import './App.css'
import { TaskType, Todolist } from './сomponents/Todolist/TodoList'

import { v4 as uuidv4 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: uuidv4(), title: 'CSS&Html', isDone: true },
    { id: uuidv4(), title: 'JS', isDone: true },
    { id: uuidv4(), title: 'React', isDone: false },
    { id: uuidv4(), title: 'TS', isDone: false }
  ]);

  let [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = {
      id: uuidv4(),
      title: title,
      isDone: false
    }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks(tasks);
  }

  let tasksForTodoList = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true);
  }

  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => t.isDone === false);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  )
}

export default App
