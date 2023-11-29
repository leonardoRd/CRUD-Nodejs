import { useForm } from 'react-hook-form'
import { useTask } from '../context/taskContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const { createTask, tasks, getTask, uploadTask } = useTask()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        try {
          const res = await getTask(params.id)
          console.log(res)
          setValue('title', res.title)
          setValue('descripcion', res.descripcion)
        } catch (error) {
          console.error(error)
        }
      }
    }
    loadTask()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      uploadTask(params.id, data)
    } else {
      createTask(data)
    }
    navigate('/tasks')
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md text-center">
        <h3 className="text-white text-2xl text-center mb-3 font-bold">
          Create Task
        </h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register('title', { required: true })}
          />

          {errors.title && (
            <p className=" w-full text-red-500"> title is required</p>
          )}

          <textarea
            name="descripcion"
            rows="3"
            placeholder="Descripción"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register('descripcion', { required: true })}
          ></textarea>

          {errors.descripcion && (
            <p className=" w-full text-red-500"> descripción is required</p>
          )}

          <button className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-zinc-500">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage
