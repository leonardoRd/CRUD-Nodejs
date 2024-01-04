import { useForm } from 'react-hook-form'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProducto } from '../context/productosContext'
import BotonGuardar from '../components/BotonGuardar'
import { getDatoCodigoRequest } from '../api/datoCodigo'

function ProductosFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const params = useParams()

  const { createProducto, uploadProducto, getProducto, getCantidadInventario } =
    useProducto()
  const [unidadMedida, setUnidadMedida] = useState([])
  const [deposito, setDeposito] = useState([])
  const [tipos, setTipos] = useState([])
  const [editable, setEditable] = useState(true)

  async function loadProducto() {
    if (params.id) {
      const res = await getProducto(params.id)
      // setear todos los valores
      setValue('descripcion', res.descripcion)
      setValue('unidadMedida', res.unidadMedida)
      setValue('deposito', res.deposito)
      setValue('tipo', res.tipo)
      setValue('usuario', res.usuario)

      const buscarCantidad = await getCantidadInventario(params.id)
      setValue('cantidad', buscarCantidad.data[0].cantidad)
      setEditable(false)
    }
  }

  async function loadUnidadMedida(datoComunFind) {
    try {
      const res = await getDatoCodigoRequest(datoComunFind)
      if (datoComunFind === 'UNIMED') {
        setUnidadMedida(res.data)
      } else {
        if (datoComunFind === 'DEPOSITO') {
          setDeposito(res.data)
        } else setTipos(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadProducto()
    loadUnidadMedida('UNIMED')
    loadUnidadMedida('DEPOSITO')
    loadUnidadMedida('TIPOITEM')
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

        <div className="flex justify-start">
          <Link
            to="/productos"
            className="w-auto bg-blue-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-500"
          >
            Productos
          </Link>
        </div>

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

              <select
                name="unidadMedida"
                {...register('unidadMedida', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
              >
                <option value="">Selecciona una Unidad de Medida</option>
                {unidadMedida.map((unidad) => (
                  <option key={unidad._id} value={unidad.datoCodigo}>
                    {unidad.valorTexto}
                  </option>
                ))}
              </select>

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

              <select
                name="deposito"
                {...register('deposito', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
              >
                <option value="">Selecciona un depósito</option>
                {deposito.map((dep) => (
                  <option key={dep._id} value={dep.datoCodigo}>
                    {dep.valorTexto}
                  </option>
                ))}
              </select>
              {errors.deposito && (
                <p className=" w-full text-red-500">Depósito es requerida</p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Tipo del producto:
              </label>

              <select
                name="tipo"
                {...register('tipo', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
              >
                <option value="">Selecciona un Tipo</option>
                {tipos.map((tipo) => (
                  <option key={tipo._id} value={tipo.datoCodigo}>
                    {tipo.valorTexto}
                  </option>
                ))}
              </select>

              {errors.tipo && (
                <p className=" w-full text-red-500">Tipo es requerida</p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Cantidad:
              </label>

              <input
                type="number"
                placeholder="0.00"
                name="cantidad"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                readOnly={!editable}
                {...register('cantidad', { required: true })}
              />

              {errors.cantidad && (
                <p className=" w-full text-red-500">Cantidad es requerida</p>
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
        </form>
      </div>
    </div>
  )
}

export default ProductosFormPage
