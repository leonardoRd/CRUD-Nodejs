import { useInventario } from '../../context/inventarioContext'
import { useEffect } from 'react'
import InventarioTable from '../../components/InventarioTable'

function InventarioPage() {
  const { inventario, getAllInventario } = useInventario()

  useEffect(() => {
    getAllInventario()
  }, [])

  return (
    <div>
      <h1 className="font-bold text-2xl text-white pb-5 text-center">
        Inventario
      </h1>

      <div className="overflow-x-auto flex items-center justify-center">
        <table
          border="1"
          className="min-w-full table-auto justify-center text-center max-w-full"
        >
          <thead>
            <tr>
              <th className="text-white px-4 border-x-2 border-cyan-400" hidden>
                ProductoId
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Producto
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Cantidad
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {inventario.map((product) => (
              <InventarioTable product={product} key={product._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InventarioPage
