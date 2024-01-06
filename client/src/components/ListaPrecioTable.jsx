import { Link } from 'react-router-dom'
import { useListaPrecio } from '../context/listaPrecioContext'

function ListaPrecioTable({ lista }) {
  const { deleteListaDePrecio } = useListaPrecio()
  console.log(lista)
  let fechaVigencia = new Date(lista.fechaVigencia).toISOString()
  fechaVigencia = fechaVigencia.slice(0,10)
  let fechaExpiracion = new Date(lista.fechaExpiracion).toISOString()
  fechaExpiracion = fechaExpiracion.slice(0,10)
  return (
    <tr className="overflow-x-auto text-center hover:bg-zinc-500 cursor-pointer">
      <td hidden>{lista._id}</td>
      <td>{lista.descripcion}</td>
      <td>{lista.incluyeImpuesto}</td>
      <td>{fechaVigencia}</td>
      <td>{fechaExpiracion}</td>
      <td>
        <Link
          to={`/listaPrecio/${lista._id}`}
          className="bg-blue-600 rounded-md px-3 py-2 mx-2 hover:bg-blue-500 md:inline-block"
        >
          Editar
        </Link>
        <button
          className="bg-red-600 rounded-md px-3 py-2 mx-2 hover:bg-red-500 md:inline-block"
          onClick={() => {
            deleteListaDePrecio(lista._id)
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default ListaPrecioTable
