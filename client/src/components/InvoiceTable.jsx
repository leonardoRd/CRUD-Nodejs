import { useInvoice } from '../context/invoiceContext'
import { Link } from 'react-router-dom'

function InvoiceTable({ invoice }) {
  const { deleteInvoice } = useInvoice()
  const fecha = new Date(invoice.fechaEmision).toISOString()
  return (
    <tr className="text-center hover:bg-zinc-500 cursor-pointer overflow-x-auto">
      <td>{invoice.tipoComprobante}</td>
      <td>{invoice.descripcion}</td>
      <td>{invoice.estado.descripcion}</td>
      <td>{fecha}</td>
      <td>${invoice.importe}</td>
      <td>{invoice.tasaDeCambio}</td>
      <td>{invoice.cliente.username}</td>
      <td>{invoice.condicionPago}</td>
      <td className=''>
        <Link
          to={`/invoice/${invoice._id}`}
          className="bg-blue-600 rounded-md px-3 py-2 mx-2 hover:bg-blue-500 md:inline-block"
        >
          Editar
        </Link>
        <button
          className="bg-red-600 rounded-md px-3 py-2 mx-2 hover:bg-red-500 md:inline-block"
          onClick={() => {
            deleteInvoice(invoice._id)
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default InvoiceTable
