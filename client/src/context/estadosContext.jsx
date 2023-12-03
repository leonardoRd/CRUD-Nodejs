import { createContext, useContext, useState } from 'react'
import {
  getEstadoRequest,
  getEstadosRequest,
  createEstadoRequest,
  deleteEstadoRequest,
  uploadEstadoRequest,
} from '../api/estados'

export const EstadosContext = createContext()

export const useEstados = () => {
  const context = useContext(EstadosContext)

  if (!context) {
    throw new Error('Use Auth Provider')
  }
  return context
}

export const EstadosProvider = ({ children }) => {
  const [estados, setEstados] = useState([])

  const getEstado = async (id) => {
    try {
      const res = await getEstadoRequest(id)
    } catch (error) {
      console.error(error)
    }
  }

  const getEstados = async () => {
    try {
      const res = await getEstadosRequest()
      setEstados(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createEstado = async (estado) => {
    try {
      const res = await createEstadoRequest(estado)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteEstado = async (id) => {
    try {
      const res = await deleteEstadoRequest(id)
      if (res.status === 200)
        setEstados(estados.filter((estado) => estado._id != id))
    } catch (error) {
      console.error(error)
    }
  }

  const uploadEstado = async (id, estado) => {
    try {
      const res = await uploadEstadoRequest(id, estado)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <EstadosContext.Provider
      value={{
        estados,
        getEstado,
        getEstados,
        createEstado,
        deleteEstado,
        uploadEstado,
      }}
    >
      {children}
    </EstadosContext.Provider>
  )
}
