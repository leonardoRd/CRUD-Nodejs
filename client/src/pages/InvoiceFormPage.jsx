import { useForm } from "react-hook-form";
import { useInvoice } from "../context/invoiceContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function InvoiceFormPage() {
    const {register, handleSubmit, setValue, formState: {errors} } = useForm();
    const {createInvoice, invoice, getInvoice, uploadInvoice} = useInvoice()
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadInvoice() {
            if(params.id) {                          
                try {
                    const res = await getInvoice(params.id);                
                    console.log(res)
                    //setValue('title', res.title);
                    //setValue('descripcion', res.descripcion);    
                } catch (error) {
                    console.error(error);
                }                      
            }
        }
        loadInvoice();
    },[]);

    const onSubmit = handleSubmit ( async (data) => {
        if(params.id){
            uploadInvoice(params.id, data);
        }else{            
            console.log("acaaaaa", data)
            createInvoice(data)
        }        
        navigate("/invoices")
    });

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md text-center'>

                <h3 className="text-white text-2xl text-center mb-3 font-bold">Create Invoice</h3>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Tipo de Comprobante" name="tipoComprobante" 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                    {...register("tipoComprobante", {required: true })} />

                    {
                        errors.tipoComprobante && <p className=' w-full text-red-500'> tipo de comprobante is required</p>
                    }

                    <textarea name="descripcion" rows="3" placeholder="Descripción"
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                    {...register("descripcion", {required: true })}></textarea>

                    {
                        errors.descripcion && <p className=' w-full text-red-500'> descripción is required</p>
                    }

                    <input type="text" placeholder="Estado" name="estado" 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                    {...register("estado", {required: true })} />

                    {
                        errors.estado && <p className=' w-full text-red-500'> Estado is required</p>
                    }

                    <input type="date" placeholder="Fecha Emisión" name="fechaEmision" 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                    {...register("fechaEmision", {required: true })} />

                    {
                        errors.fechaEmision && <p className=' w-full text-red-500'> Fecha is required</p>
                    }

                    <input type="number" placeholder="Importe" name="importe" 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                    {...register("importe", {required: true })} />

                    {
                        errors.importe && <p className=' w-full text-red-500'> Importe is required</p>
                    }

                    <input type="number" placeholder="Tasa de Cambio" name="tasaDeCambio" 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                    {...register("tasaDeCambio", {required: true })} />

                    {
                        errors.tasaDeCambio && <p className=' w-full text-red-500'> tasa de cambio is required</p>
                    }
                    
                    <button className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-zinc-500'>
                        Save
                    </button>
                </form>
            </div>
        </div>
        
    )
}

export default InvoiceFormPage;