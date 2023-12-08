import { useEffect } from 'react'
import { useEstados } from '../context/estadosContext'
import EstadoTable from '../components/EstadoTable'

function EstadosPage() {
  const { getEstados, estados } = useEstados()

  useEffect(() => {
    getEstados()
  }, [])

  if (!estados.length === 0) return <h1>No hay Estados cargados</h1>
  return (
    <div>
      <h1 className="font-bold text-2xl text-white pb-5 text-center">
        Estados de Comprobantes
      </h1>
      <div className="overflow-x-auto flex items-center justify-center">
        <table border="1" className="min-w-full justify-center text-center max-w-full">
          <thead>
            <tr>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Estado ID
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Descripción
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {estados.map((estado) => (
              <EstadoTable estado={estado} key={estado._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EstadosPage
