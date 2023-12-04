import { useEffect } from 'react'
import { useInvoice } from '../context/invoiceContext'
import { useTipoComprob } from '../context/tipoComprobContext'
import InvoiceTable from '../components/InvoiceTable'
import { useForm } from 'react-hook-form'


function InvoicesPage() {
  const { getInvoices, invoice, setInvoice } = useInvoice()
  const { getTiposComprob, tipoComprob } = useTipoComprob()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    getInvoices()
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

  const handleFiltroTipo = async (selectedValue) => {
    try {
        getInvoices(selectedValue)
    } catch (error) {
        console.error(error)
    }
  }

  if (!invoice.length === 0) return <h1>No hay Facturas</h1>

  return (
    <div>
      <div>
        <select
          onChange={(e) => {
            console.log(e.target.value)
            handleFiltroTipo(e.target.value)
          }}
          name="tipoComprobante"
          className="w-90 bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"          
        >
          <option value="">Selecciona un Tipo de Comprobante</option>
          {tipoComprob.map((tipo) => (
            <option key={tipo._id} value={tipo.tipoComprobanteID}>
              {tipo.descripcion}
            </option>
          ))}
        </select>
      </div>
      <h1 className=" text-center font-bold text-2xl text-white pb-5">
        Facturas
      </h1>
      <div className="flex items-center justify-center">
        <table border="1" className="justify-center text-center max-w-full">
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
