import './App.css'
import { TaskType, Todolist } from './сomponents/Todolist/TodoList'

function App() {

  let tasks1: Array<TaskType> = [
    { id: 1, title: 'CSS&Html', isDone: true },
    { id: 1, title: 'JS', isDone: true },
    { id: 1, title: 'React', isDone: false }
  ]

  let tasks2: Array<TaskType> = [
    { id: 1, title: 'Terminator', isDone: true },
    { id: 1, title: 'XXX', isDone: false },
    { id: 1, title: 'Jentlments of fortune', isDone: true }
  ]

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks1} />
      <Todolist title="Movies" tasks={tasks2} />
    </div>
  )
}

export default App
