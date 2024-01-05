import { createContext, useContext, useState } from 'react'
import {
  deleteInventarioRequest,
  getInventarioRequest,
  uploadInventarioRequest,
  getInventarioIdRequest,
} from '../api/inventario'

export const InventarioContext = createContext()

export const useInventario = () => {
  const context = useContext(InventarioContext)

  if (!context) {
    throw new Error('Use Auth Provider')
  }
  return context
}

export const InventarioProvider = ({ children }) => {
  const [inventario, setInventario] = useState([])

  // Todas la funciones globales para el manejo del inventario
  const getAllInventario = async () => {
    try {
      const res = await getInventarioRequest()
      setInventario(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getInventario = async (id) => {
    try {
      const res = await getInventarioIdRequest(id)

      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateInventario = async (id, data) => {
    try {
      const res = await uploadInventarioRequest(id, data)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteInventario = async (id) => {
    try {
      const res = await deleteInventarioRequest(id)

      if (res.status === 200)
        setInventario(inventario.filter((product) => product._id != id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <InventarioContext.Provider
      value={{
        inventario,
        getAllInventario,
        deleteInventario,
        getInventario,
        updateInventario,
      }}
    >
      {children}
    </InventarioContext.Provider>
  )
}
