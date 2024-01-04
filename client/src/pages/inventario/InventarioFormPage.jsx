import { useForm } from 'react-hook-form'
import BotonGuardar from '../../components/BotonGuardar'
import BotonVolver from '../../components/BotonVolver'
import { useEffect } from 'react'
import { useInventario } from '../../context/inventarioContext'
import { useParams, useNavigate } from 'react-router-dom'

function InventarioFormPage() {
  const { register, handleSubmit, setValue } = useForm()
  const { getInventario, updateInventario } = useInventario()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadInventario() {
      if (params.id) {
        const res = await getInventario(params.id)

        setValue('producto', res.productoID.descripcion)
        setValue('cantidad', res.cantidad)
      }
    }
    loadInventario()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      const res = await updateInventario(params.id, data)
    }
    navigate('/inventario')
  })

  const volver = () => {
    navigate('/inventario')
  }

  return (
    <div className="flex h-auto items-center justify-center">
      <div className="bg-zinc-800 w-full h-auto p-5 rounded-md text-center">
        {/*Titulo*/}
        <h3 className="text-white text-2xl text-center mb-3 font-bold">
          Modificar Inventario
        </h3>

        <div className="w-auto h-auto flex text-center justify-center">
          <form onSubmit={onSubmit}>
            <div>
              <label className="text-white flex font-bold text-md text-center">
                Descripción del producto:
              </label>
              <input
                type="text"
                name="producto"
                readOnly
                className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('producto', { required: true })}
              />

              <label className="text-white flex font-bold text-md text-left">
                Cantidad del producto:
              </label>
              <input
                type="number"
                name="cantidad"
                className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('cantidad', { required: true })}
              />
            </div>
            <div className="p-2 flex justify-between">
              <BotonGuardar />
              <BotonVolver onClick={volver} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InventarioFormPage
