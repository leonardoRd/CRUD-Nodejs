import { useEffect } from 'react'
import { useTask } from '../context/taskContext'
import TaskCard from '../components/TaskCard'

function TaskPage() {
  const { getTasks, tasks } = useTask()

  useEffect(() => {
    getTasks()
  }, [])

  if (tasks.length === 0) return <h1>No hay Tareas</h1>

  return (
    <div className="grid sm:grid-cols-2  md:grid-cols-3 gap-x-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  )
}

export default TaskPage
