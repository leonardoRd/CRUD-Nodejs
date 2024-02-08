import { Link } from 'react-router-dom'
function PersonaTable(props) {
  const { persona, mostrarModalConfirmacion } = props
  return (
    <tr className="overflow-x-auto text-center hover:bg-zinc-500 cursor-pointer">
      <td hidden>{persona._id}</td>
      <td>{persona.razonSocial}</td>
      <td>{persona.numeroDocumento}</td>
      <td>{persona.codigoFiscal}</td>
      <td>{persona.edad}</td>
      <td>
        <Link
          to={`/personas/${persona._id}`}
          className="bg-blue-600 rounded-md px-3 py-2 mx-2 hover:bg-blue-500 md:inline-block"
        >
          Editar
        </Link>
        <button
          className="bg-red-600 rounded-md px-3 py-2 mx-2 hover:bg-red-500 md:inline-block"
          onClick={() => {
            mostrarModalConfirmacion(persona._id)
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default PersonaTable
