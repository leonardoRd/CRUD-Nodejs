import { createContext, useContext, useState } from 'react'
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from '../api/task'

export const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('Use Auth Provider')
  }
  return context
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  // Aca van todas las funciones
  const getTasks = async () => {
    try {
      const res = await getTasksRequest()
      setTasks(res.data)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      if (res.status === 200) setTasks(tasks.filter((task) => task._id != id))
    } catch (error) {
      console.error(error)
    }
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const uploadTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        createTask,
        getTasks,
        tasks,
        deleteTask,
        getTask,
        uploadTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
