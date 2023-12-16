import { useEffect, useState } from 'react'
import { getDatoCodigosRequest } from '../../api/datoCodigo'
import DatoCodigoTable from '../../components/DatoCodigoTable'

function DatoCodigoPage() {
  const [datosCodigos, setDatosCodigos] = useState([])

  useEffect(() => {
    async function loadDatoCodigos() {
      try {
        const res = await getDatoCodigosRequest()
        setDatosCodigos(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    loadDatoCodigos()
  }, [])

  if (!datosCodigos.length === 0) return <h1>No hay Datos Codigos cargados</h1>

  return (
    <div>
      <h1 className="font-bold text-2xl text-white pb-5 text-center">
        Datos Códigos
      </h1>
      <div className="overflow-x-auto flex items-center justify-center">
        <table
          border="1"
          className="min-w-full justify-center text-center max-w-full"
        >
          <thead>
            <tr>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Dato Común
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Dato Código
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Valor texto
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Valor numérico
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Valor booleano
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {datosCodigos.map((dato) => (
              <DatoCodigoTable datoCodigo={dato} key={dato._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DatoCodigoPage
