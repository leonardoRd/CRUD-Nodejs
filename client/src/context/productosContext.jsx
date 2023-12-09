import { createContext, useContext, useState } from 'react'
import {
  createProductoRequest,
  getProductoRequest,
  getProductosRequest,
  deleteProductoRequest,
  uploadProductoRequest,
} from '../api/productos'

export const ProductoContext = createContext()

export const useProducto = () => {
  const context = useContext(ProductoContext)

  if (!context) {
    throw new Error('Use Auth Provider')
  }
  return context
}

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([])

  // Todas la funciones para obtener los datos de productos
  // gets post delete upload

  return (
    <ProductoContext.Provider value={{}}>{children}</ProductoContext.Provider>
  )
}
