import {createContext, useContext, useState} from 'react'
import { getTipoComprobRequest, getTiposComprobRequest, createTipoComprobRequest,
     deleteTipoComprobRequest, updateTipoComprobRequest } from "../api/tipoComprobante";

export const TipoComprobanteContext = createContext();

export const useTipoComprob = () => {
    const context = useContext(TipoComprobanteContext);

    if (!context) {
        throw new Error("Use Auth Provider")
    } 
    return context;
}

export const TipoComprobanteProvider = ({children}) => {

    const [tipoComprob, setTipoComprob] = useState([]);

    const getTiposComprob = async () => {
        try {
            const res = await getTiposComprobRequest();    
            console.log(res.data)
            setTipoComprob(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getTipoComprob = async (id) => {
        try {
            const res = await getTipoComprobRequest(id);    
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const createTipoComprob = async (tipoComprob) => {
        try {
            const res = await createTipoComprobRequest(tipoComprob);
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteTipoComprob = async (id) => {
        try {
            const res = await deleteTipoComprobRequest(id)
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const updateTipoComprob = async (id, tipoComprob) => {
        try {
            const res = await updateTipoComprobRequest(id, tipoComprob)
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }
    return (        
        <TipoComprobanteContext.Provider value={{
            getTipoComprob,
            getTiposComprob,
            createTipoComprob,
            deleteTipoComprob,
            updateTipoComprob,
            tipoComprob
        }} >
            {children}
        </TipoComprobanteContext.Provider>
    )
};
