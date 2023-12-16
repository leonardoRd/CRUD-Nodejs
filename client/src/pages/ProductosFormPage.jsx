import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useProducto } from '../context/productosContext'
import BotonGuardar from '../components/BotonGuardar'

function ProductosFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const params = useParams()

  const { createProducto, uploadProducto, getProducto } = useProducto()

  useEffect(() => {
    async function loadProducto() {
      if (params.id) {
        const res = await getProducto(params.id)
        // setear todos los valores
        setValue('descripcion', res.descripcion)
        setValue('unidadMedida', res.unidadMedida)
        setValue('deposito', res.deposito)
        setValue('tipo', res.tipo)
        setValue('usuario', res.usuario)
      }
    }

    loadProducto()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      uploadProducto(params.id, data)
    } else {
      createProducto(data)
    }
    navigate('/productos')
  })

  return (
    <div className="flex h-auto items-center justify-center">
      <div className="bg-zinc-800 w-full h-auto p-5 rounded-md text-center">
        {/*Titulo*/}
        <h3 className="text-white text-2xl text-center mb-3 font-bold">
          Agregar Producto
        </h3>

        {/* Formulario */}
        <form onSubmit={onSubmit}>
          <div className="grid md:grid-cols-3 sm:grid-cols-1">
            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Descripción del producto:
              </label>
              <input
                type="text"
                placeholder="Ingrese la Descripción"
                name="descripcion"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('descripcion', { required: true })}
              />
              {errors.descripcion && (
                <p className=" w-full text-red-500">Descripción es requerida</p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Unidad de Medida:
              </label>
              <input
                type="text"
                placeholder="Ingrese Unidad de Medida"
                name="unidadMedida"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('unidadMedida', { required: true })}
              />
              {errors.unidadMedida && (
                <p className=" w-full text-red-500">
                  Unidad de Medida es requerida
                </p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Depósito:
              </label>
              <input
                type="text"
                placeholder="Ingrese la Depósito"
                name="deposito"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('deposito', { required: true })}
              />
              {errors.deposito && (
                <p className=" w-full text-red-500">Depósito es requerida</p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Tipo del producto:
              </label>
              <input
                type="text"
                placeholder="Ingrese el Tipo"
                name="tipo"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('tipo', { required: true })}
              />
              {errors.tipo && (
                <p className=" w-full text-red-500">Tipo es requerida</p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Usuario del producto:
              </label>
              <input
                type="text"
                placeholder="Ingrese el Usuario"
                name="usuario"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('usuario', { required: true })}
              />
              {errors.usuario && (
                <p className=" w-full text-red-500">Usuario es requerida</p>
              )}
            </div>
          </div>
          <BotonGuardar />
          {/* <button className="w-auto bg-blue-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-500">
            Guardar
          </button> */}
        </form>
      </div>
    </div>
  )
}

export default ProductosFormPage
