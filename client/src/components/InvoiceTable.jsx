import {useInvoice} from "../context/invoiceContext";
import { Link } from "react-router-dom";

function InvoiceTable( {invoice} ) {
    const { deleteInvoice } = useInvoice();

    return (
        <tr className="text-center hover:bg-zinc-500 cursor-pointer">
            <td>{invoice.tipoComprobante}</td>
            <td>{invoice.descripcion}</td>
            <td>{invoice.estado}</td>
            <td>{new Date(invoice.fechaEmision).toLocaleDateString()}</td>
            <td>${invoice.importe}</td>
            <td>{invoice.tasaDeCambio}</td>            
            <td>            
                <button className="bg-red-600 rounded-md px-3 py-2 mx-2 hover:bg-red-500" onClick={() => {
                    deleteInvoice(invoice._id);
                }}>Eliminar</button>
            </td>
        </tr>
    
    )
}

export default InvoiceTable;