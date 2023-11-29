import { useTipoComprob } from '../context/tipoComprobContext'
import { Link } from 'react-router-dom'

function TipoComprobTable({ tipoComp }) {
  const { deleteTipoComprob } = useTipoComprob()

  return (
    <tr className="text-center hover:bg-zinc-500 cursor-pointer">
      <td>{tipoComp.tipoComprobanteID}</td>
      <td>{tipoComp.descripcion}</td>
      <td>
        <Link
          to={`/tipoComprob/${tipoComp._id}`}
          className="bg-blue-600 rounded-md px-3 py-2 mx-2 hover:bg-blue-500"
        >
          Editar
        </Link>
        <button
          className="bg-red-600 rounded-md px-3 py-2 mx-2 hover:bg-red-500"
          onClick={() => {
            deleteTipoComprob(tipoComp._id)
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default TipoComprobTable
