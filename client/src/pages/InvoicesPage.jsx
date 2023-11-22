import { useEffect } from "react";
import {useInvoice} from "../context/invoiceContext";
import InvoiceTable from "../components/InvoiceTable"

function InvoicesPage() {

    const {getInvoices, invoice} = useInvoice();

    useEffect(() => {
        getInvoices()
    }, []);

    if(!invoice.length === 0) return (<h1>No hay Facturas</h1>)

    return (
        <div className="">
            <h1 className="text-bold text-2xl text-white pb-5">Invoices List</h1>
            <table border="1" className="justify-center text-center max-w-full">
            <thead>
                <tr>
                    <th className="text-white px-4 border-x-2 border-cyan-400">Tipo Comprobante</th>
                    <th className="text-white px-4 border-x-2 border-cyan-400">Descripción</th>
                    <th className="text-white px-4 border-x-2 border-cyan-400">Estado</th>
                    <th className="text-white px-4 border-x-2 border-cyan-400">Fecha Emisión</th>
                    <th className="text-white px-4 border-x-2 border-cyan-400">Importe</th>
                    <th className="text-white px-4 border-x-2 border-cyan-400">Tasa de cambio</th>
                    {/* <th className="text-white px-4 border-x-2 border-cyan-400">Persona</th> */}
                    <th className="text-white px-4 border-x-2 border-cyan-400">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    invoice.map( invoice => (
                    <InvoiceTable invoice={invoice} key={invoice._id}/> 
                ))
                }
            </tbody>
        </table>
    </div>        
    )
};

export default InvoicesPage;