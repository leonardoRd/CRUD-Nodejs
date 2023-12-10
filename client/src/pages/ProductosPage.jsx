import { useEffect } from 'react'
import { useProducto } from '../context/productosContext'
import ProductosTable from '../components/ProductosTable'

function ProductosPage() {
  const { productos, getProductos } = useProducto()

  useEffect(() => {
    async function getProducts() {
      try {
       await getProductos()
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [])

  return (
    <div>
      <h1 className="font-bold text-2xl text-white pb-5 text-center">
        Productos
      </h1>
      <div className="overflow-x-auto flex items-center justify-center">
        <table
          border="1"
          className="min-w-full table-auto justify-center text-center max-w-full"
        >
          <thead>
            <tr>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Descripción
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Unidad de Medida
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Depósito
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Tipo
              </th>

              <th className="text-white px-4 border-x-2 border-cyan-400">
                Usuario
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((product) => (
              <ProductosTable product={product} key={product._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductosPage
