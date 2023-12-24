import { useProducto } from '../context/productosContext'
import { Link } from 'react-router-dom'

function ProductosTable({ product }) {
  const { deleteProducto } = useProducto()
  return (
    <tr className="overflow-x-auto text-center hover:bg-zinc-500 cursor-pointer">
      <td>{product.descripcion}</td>
      <td>{product.unidadMedida}</td>
      <td>{product.deposito}</td>
      <td>{product.tipo}</td>
      <td>{product.usuario}</td>
      <td>
        <Link
          to={`/productos/${product._id}`}
          className="bg-blue-600 rounded-md px-3 py-2 mx-2 hover:bg-blue-500 md:inline-block"
        >
          Editar
        </Link>
        <button
          className="bg-red-600 rounded-md px-3 py-2 mx-2 hover:bg-red-500 md:inline-block"
          onClick={() => {
            deleteProducto(product._id)
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default ProductosTable
