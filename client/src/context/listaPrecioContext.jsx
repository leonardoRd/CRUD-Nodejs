import { createContext, useContext, useState } from 'react'
import {
  getListaPrecioRequest,
  getListaPrecioIdRequest,
  createListaPrecioRequest,
  uploadListaPrecioRequest,
  deleteListaPrecioRequest,
} from '../api/listaPrecio'

export const ListaPrecioContext = createContext()

export const useListaPrecio = () => {
  const context = useContext(ListaPrecioContext)

  if (!context) {
    throw new Error('Use Auth Provider')
  }
  return context
}

export const ListaPrecioProvider = ({ children }) => {
  const [listaPrecio, setListaPrecio] = useState([])

  // Metodos para las listas de precios

  const getListasDePrecio = async () => {
    try {
      const res = await getListaPrecioRequest()
      setListaPrecio(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteListaDePrecio = async (id) => {
    try {
      const res = await deleteListaPrecioRequest(id)

      if (res.status === 200)
        setListaPrecio(listaPrecio.filter((lista) => lista._id != id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ListaPrecioContext.Provider
      value={{ listaPrecio, getListasDePrecio, deleteListaDePrecio }}
    >
      {children}
    </ListaPrecioContext.Provider>
  )
}
