import { createContext, useContext, useState } from 'react'
import {
  getListaPrecioRequest,
  getListaPrecioIdRequest,
  createListaPrecioRequest,
  uploadListaPrecioRequest,
  deleteListaPrecioRequest,
  getListaPrecioItemRequest,
  deleteListaPrecioItemsRequest,
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

  const getListaPrecio = async (id) => {
    try {
      const res = await getListaPrecioIdRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const getListaPrecioItems = async (id) => {
    try {
      const res = await getListaPrecioItemRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const createListaPrecio = async (data) => {
    try {
      const res = await createListaPrecioRequest(data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateListaPrecio = async (id, data) => {
    try {
      const res = await uploadListaPrecioRequest(id, data)
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

  const deleteListaPrecioItems = async (data) => {
    try {
      console.log(data)
      deleteListaPrecioItemsRequest(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ListaPrecioContext.Provider
      value={{
        listaPrecio,
        getListasDePrecio,
        deleteListaDePrecio,
        createListaPrecio,
        getListaPrecioItems,
        getListaPrecio,
        updateListaPrecio,
        deleteListaPrecioItems,
      }}
    >
      {children}
    </ListaPrecioContext.Provider>
  )
}
