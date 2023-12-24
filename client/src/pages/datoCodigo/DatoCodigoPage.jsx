import { useEffect, useState } from 'react'
import {
  getDatoCodigosRequest,
  deleteDatoCodigoRequest,
} from '../../api/datoCodigo'
import DatoCodigoTable from '../../components/DatoCodigoTable'

function DatoCodigoPage() {
  const [datosCodigos, setDatosCodigos] = useState([])
  const [filtroCodigo, setFiltroCodigo] = useState('')
  const [filtroComun, setFiltroComun] = useState('')
  const [descripcion, setDescripcion] = useState('')

  async function loadDatoCodigos() {
    try {
      const res = await getDatoCodigosRequest()
      setDatosCodigos(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadDatoCodigos()
  }, [])

  const eliminarDatoCodigo = async (datoComun, datoCodigo) => {
    try {
      await deleteDatoCodigoRequest(datoComun, datoCodigo)
      // Después de eliminar el dato, actualiza el estado para desencadenar el re-renderizado
      loadDatoCodigos()
    } catch (error) {
      console.log(error)
    }
  }

  const handleFiltroDato = async (comun, codigo) => {
    try {
      const res = await getDatoCodigosRequest(comun, codigo)
      setDatosCodigos(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  if (!datosCodigos.length === 0) return <h1>No hay Datos Codigos cargados</h1>

  return (
    <div>
      {/*FILTROS*/}
      <div className="px-2 flex flex-col-2">
        <div>
          <label className="text-white font-bold block mb-2">
            Ingrese el Dato Común que desea buscar
          </label>
          <input
            type="text"
            name="findDatoComun"
            onKeyDown={(e) => {
              const dato = e.target.value
              setFiltroComun(dato)
              handleFiltroDato(dato, filtroCodigo, descripcion)
            }}
            onBlur={(e) => {
              const dato = e.target.value
              setFiltroComun(dato)
              handleFiltroDato(dato, filtroCodigo, descripcion)
            }}
            placeholder="Ingrese el Dato Código a buscar"
            className="w-80 bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 mr-4 ms:w-auto"
          />
        </div>

        <div>
          <label className="text-white font-bold block mb-2">
            Ingrese el Dato Código que desea buscar
          </label>
          <input
            type="text"
            name="findDatoCodigo"
            onKeyDown={(e) => {
              const dato = e.target.value
              setFiltroCodigo(dato)
              handleFiltroDato(filtroComun, dato, descripcion)
            }}
            onBlur={(e) => {
              const dato = e.target.value
              setFiltroCodigo(dato)
              handleFiltroDato(filtroComun, dato, descripcion)
            }}
            placeholder="Ingrese el Dato Código a buscar"
            className="w-80 bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 mr-4 ms:w-auto"
          />
        </div>

        <div>
          <label className="text-white font-bold block mb-2">
            Ingrese la Descrición que desea buscar
          </label>
          <input
            type="text"
            name="findDescripcion"
            onKeyDown={(e) => {
              const dato = e.target.value
              setDescripcion(dato)
              handleFiltroDato(filtroComun, filtroCodigo, dato)
            }}
            onBlur={(e) => {
              const dato = e.target.value
              setDescripcion(dato)
              handleFiltroDato(filtroComun, filtroCodigo, dato)
            }}
            placeholder="Ingrese el Dato Código a buscar"
            className="w-80 bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 mr-4 ms:w-auto"
          />
        </div>
      </div>

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
                Descripción
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {datosCodigos.map((dato) => (
              <DatoCodigoTable
                datoCodigo={dato}
                key={dato._id}
                onDelete={eliminarDatoCodigo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DatoCodigoPage
