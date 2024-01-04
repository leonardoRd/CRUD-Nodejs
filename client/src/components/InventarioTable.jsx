import { useInventario } from '../context/inventarioContext'
import { Link } from 'react-router-dom'

function InventarioTable({ product }) {
  const { deleteInventario } = useInventario()
  return (
    <tr className="overflow-x-auto text-center hover:bg-zinc-500 cursor-pointer">
      <td hidden>{product._id}</td>
      <td>{product.productoID.descripcion}</td>
      <td>{product.cantidad}</td>
      <td>
        <Link
          to={`/inventario/${product._id}`}
          className="bg-blue-600 rounded-md px-3 py-2 mx-2 hover:bg-blue-500 md:inline-block"
        >
          Editar
        </Link>
        <button
          className="bg-red-600 rounded-md px-3 py-2 mx-2 hover:bg-red-500 md:inline-block"
          onClick={() => {
            deleteInventario(product._id)
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default InventarioTable
