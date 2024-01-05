import { createContext, useContext, useState } from 'react'
import {
  createProductoRequest,
  getProductoRequest,
  getProductosRequest,
  deleteProductoRequest,
  uploadProductoRequest,
  getCantInventarioRequest,
} from '../api/productos'

export const ProductosContext = createContext()

export const useProducto = () => {
  const context = useContext(ProductosContext)

  if (!context) {
    throw new Error('Use Auth Provider')
  }
  return context
}

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([])

  // Todas la funciones para obtener los datos de productos
  const getCantidadInventario = async (id) => {
    try {
      const res = await getCantInventarioRequest(id)
      return res
    } catch (error) {
      console.error(error)
    }
  }

  // gets post delete upload
  const getProductos = async () => {
    try {
      const res = await getProductosRequest()

      setProductos(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getProducto = async (id) => {
    try {
      const res = await getProductoRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const createProducto = async (product) => {
    try {
      const res = await createProductoRequest(product)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProducto = async (id) => {
    try {
      const res = await deleteProductoRequest(id)

      if (res.status === 200)
        setProductos(productos.filter((product) => product._id != id))
    } catch (error) {
      console.log(error)
    }
  }

  const uploadProducto = async (id, product) => {
    try {
      const res = await uploadProductoRequest(id, product)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProductosContext.Provider
      value={{
        getProducto,
        getProductos,
        createProducto,
        deleteProducto,
        uploadProducto,
        getCantidadInventario,
        productos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  )
}
