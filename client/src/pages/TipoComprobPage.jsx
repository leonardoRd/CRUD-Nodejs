import { useEffect } from "react";
import { useTipoComprob } from "../context/tipoComprobContext";
//import TaskCard from "../components/TaskCard";
import TipoComprobTable from '../components/TipoComprobTable'

function TipoComprobPage() {
    const {getTiposComprob, tipoComprob} = useTipoComprob();

    useEffect(() => {
        getTiposComprob()
    }, [])

    if(!tipoComprob.length === 0) return (<h1>No hay Tipos de Comprobantes</h1>)
    return (
        <div className="">
            <h1 className="text-bold text-2xl text-white pb-5">Tipos de Comprobantes</h1>
            <table border="1" className="justify-center text-center max-w-full">
            <thead>
                <tr>
                    <th className="text-white px-4 border-x-2 border-cyan-400">Tipo Comprobante</th>
                    <th className="text-white px-4 border-x-2 border-cyan-400">Descripción</th>
                    <th className="text-white px-4 border-x-2 border-cyan-400">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    tipoComprob.map( tipoComp => (
                    <TipoComprobTable tipoComp={tipoComp} key={tipoComp._id}/> 
                ))
                }
            </tbody>
        </table>
    </div>
    )
}

export default TipoComprobPage;