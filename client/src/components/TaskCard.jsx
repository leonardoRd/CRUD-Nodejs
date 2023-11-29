import { useTask } from '../context/taskContext'
import { Link } from 'react-router-dom'

function TaskCard({ task }) {
  const { deleteTask } = useTask()

  return (
    <div className="max-w-md w-full p-5 bg-zinc-700 rounded-md mb-3 text-center">
      <h1 className="text-white font-bold text-2xl">{task.title}</h1>
      <h2 className="text-white">{task.descripcion}</h2>
      <div className="flex justify-center mt-4 ">
        <button
          className="rounded-md bg-red-500 px-4 py-2 mx-2 hover:bg-red-400"
          onClick={() => {
            deleteTask(task._id)
          }}
        >
          Delete
        </button>
        <Link
          to={`/tasks/${task._id}`}
          className="rounded-md bg-blue-500 px-4 py-2 mx-2 hover:bg-blue-400"
        >
          Edit
        </Link>
      </div>
      <p className="mt-2">{new Date(task.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default TaskCard
