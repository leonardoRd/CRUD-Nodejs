import { useEffect, useState } from 'react'
import { useInvoice } from '../context/invoiceContext'
import { useTipoComprob } from '../context/tipoComprobContext'
import InvoiceTable from '../components/InvoiceTable'
import { Link } from 'react-router-dom'

function InvoicesPage() {
  const { getInvoices, invoice, user, getUsers } = useInvoice()
  const { getTiposComprob, tipoComprob } = useTipoComprob()
  const [tipoComprobFiltro, setTipoComprobFiltro] = useState(null)
  const [cliente, setCliente] = useState(null)

  useEffect(() => {
    getInvoices()
    getUsers()
  }, [])

  useEffect(() => {
    function loadTiposComprobantes() {
      try {
        getTiposComprob()
      } catch (error) {
        console.error(error)
      }
    }
    loadTiposComprobantes()
  }, [])

  const handleFiltroTipo = async (tipoComp, client) => {
    try {
      await getInvoices(tipoComp, client)
    } catch (error) {
      console.error(error)
    }
  }

  if (!invoice.length === 0) return <h1>No hay Facturas</h1>

  return (
    <div>
      {/* Filtros para la tabla */}
      {/* Filtro de Tipos de Comprobantes*/}
      <div className="px-2">
        <select
          onChange={(e) => {
            const comp = e.target.value
            setTipoComprobFiltro(comp)
            handleFiltroTipo(comp, cliente)
          }}
          name="tipoComprobante"
          className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 mr-4"
        >
          <option value="">Selecciona un Tipo de Comprobante</option>
          {tipoComprob.map((tipo) => (
            <option key={tipo._id} value={tipo.tipoComprobanteID}>
              {tipo.descripcion}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => {
            const cliente = e.target.value
            setCliente(cliente)
            handleFiltroTipo(tipoComprobFiltro, cliente)
          }}
          name="clienteBuscar"
          className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 mr-4"
        >
          <option value="">Selecciona un Cliente</option>
          {user.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <h1 className=" text-center font-bold text-2xl text-white pb-5">
        Facturas
      </h1>

      <div className="flex justify-end">
        <Link
          to="/add-invoice"
          className="w-auto bg-blue-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-500"
        >
          Agregar Factura
        </Link>
      </div>
      <div className="flex items-center justify-center overflow-x-auto">
        <table
          border="1"
          className="min-w-full table-auto justify-center text-center max-w-full"
        >
          <thead>
            <tr>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Tipo Comprobante
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Descripción
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Estado
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Fecha Emisión
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Importe
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Tasa de cambio
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Cliente
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Condición Pago
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.map((invoice) => (
              <InvoiceTable invoice={invoice} key={invoice._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InvoicesPage
