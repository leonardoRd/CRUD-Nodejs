import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useListaPrecio } from '../../context/listaPrecioContext'
import ListaPrecioTable from '../../components/ListaPrecioTable'

function ListaPrecioPage() {
  const { getListasDePrecio, listaPrecio } = useListaPrecio()

  useEffect(() => {
    async function loadListasDePrecios() {
      try {
        await getListasDePrecio()
      } catch (error) {
        console.error(error)
      }
    }

    loadListasDePrecios()
  }, [])

  return (
    <div>
      <h1 className="font-bold text-2xl text-white pb-5 text-center">
        Listas de Precios
      </h1>
      <div className="flex justify-end">
        <Link
          to="/add-listaPrecio"
          className="w-auto bg-blue-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-500"
        >
          Agregar Lista de Precio
        </Link>
      </div>
      <div className="overflow-x-auto flex items-center justify-center">
        <table
          border="1"
          className="min-w-full table-auto justify-center text-center max-w-full"
        >
          <thead>
            <tr>
              <th className="text-white px-4 border-x-2 border-cyan-400" hidden>
                ListaPrecioID
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Lista de Precio
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                incluye Impuesto
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Fecha Vigencia
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Fecha Expiración
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {listaPrecio.map((lista) => (
              <ListaPrecioTable lista={lista} key={lista._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListaPrecioPage
