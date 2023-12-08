import { useEstados } from '../context/estadosContext'
import { Link } from 'react-router-dom'

function EstadoTable({ estado }) {
  const { deleteEstado } = useEstados()

  return (
    <tr className="overflow-x-auto text-center hover:bg-zinc-500 cursor-pointer">
      <td>{estado.estadoID}</td>
      <td>{estado.descripcion}</td>
      <td>
        <Link
          to={`/estado/${estado._id}`}
          className="bg-blue-600 rounded-md px-3 py-2 mx-2 hover:bg-blue-500 sm:inline-block"
        >
          Editar
        </Link>
        <button
          className="bg-red-600 rounded-md px-3 py-2 mx-2 hover:bg-red-500 sm:inline-block"
          onClick={() => {
            deleteEstado(estado._id)
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default EstadoTable
