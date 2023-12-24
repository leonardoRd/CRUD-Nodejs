import { Link } from 'react-router-dom'
import { deleteDatoCodigoRequest } from '../api/datoCodigo'

function DatoCodigoTable({ datoCodigo, onDelete }) {
  return (
    <tr className="overflow-x-auto text-center hover:bg-zinc-500 cursor-pointer">
      <td>{datoCodigo.datoComun}</td>
      <td>{datoCodigo.datoCodigo}</td>
      <td>{datoCodigo.valorTexto}</td>
      <td>{datoCodigo.valorNumerico}</td>
      <td>
        <input
          type="checkbox"
          checked={datoCodigo.valorBoolean}
          readOnly
          className={`form-checkbox h-5 w-5 text-${
            datoCodigo.valorBoolean ? 'green' : 'red'
          }-500`}
        ></input>
      </td>
      <td>{datoCodigo.descripcion}</td>
      <td>
        <Link
          to={`/datoCodigo/${datoCodigo.datoComun}`}
          className="bg-blue-600 rounded-md px-3 py-2 mx-2 hover:bg-blue-500 sm:inline-block"
        >
          Editar
        </Link>
        <button
          className="bg-red-600 rounded-md px-3 py-2 mx-2 hover:bg-red-500 sm:inline-block"
          onClick={() => {
            onDelete(datoCodigo.datoComun, datoCodigo.datoCodigo)
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default DatoCodigoTable
