import { useEffect } from 'react'
import { useTipoComprob } from '../context/tipoComprobContext'
import TipoComprobTable from '../components/TipoComprobTable'

function TipoComprobPage() {
  const { getTiposComprob, tipoComprob } = useTipoComprob()

  useEffect(() => {
    getTiposComprob()
  }, [])

  if (!tipoComprob.length === 0) return <h1>No hay Tipos de Comprobantes</h1>
  return (
    <div>
      <h1 className="font-bold text-2xl text-white pb-5 text-center">
        Tipos de Comprobantes
      </h1>
      <div className="overflow-x-auto flex items-center justify-center">
        <table border="1" className="min-w-full table-auto justify-center text-center max-w-full">
          <thead>
            <tr>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Tipo Comprobante
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
            {tipoComprob.map((tipoComp) => (
              <TipoComprobTable tipoComp={tipoComp} key={tipoComp._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TipoComprobPage
