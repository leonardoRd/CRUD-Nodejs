import { useForm } from 'react-hook-form'
import { useInvoice } from '../context/invoiceContext'
import { useTipoComprob } from '../context/tipoComprobContext'
import { useEstados } from '../context/estadosContext'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moment from 'moment'
import BotonGuardar from '../components/BotonGuardar'
import { getDatoCodigoRequest } from '../api/datoCodigo'
import { useListaPrecio } from '../context/listaPrecioContext'
import ItemsTable from '../components/ItemsTable'
import Swal from 'sweetalert2'

function InvoiceFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const {
    createInvoice,
    invoice,
    getInvoice,
    uploadInvoice,
    user,
    getUsers,
    getInvoiceItem,
  } = useInvoice()

  const { getTiposComprob, tipoComprob } = useTipoComprob()
  const { getEstados, estados } = useEstados()
  const { getListasDePrecio, listaPrecio, getListaPrecioItems } =
    useListaPrecio()
  const [condicionPago, setCondicionPago] = useState([])
  const [contado, setContado] = useState(false)
  const [instrumentos, setInstrumentos] = useState([])

  const navigate = useNavigate()
  const params = useParams()
  const [selectedUser, setSelectedUser] = useState(null)

  // Estados para el manejo de la tabla de items
  const [productos, setProductos] = useState([])
  const [productoSelect, setProductoSelect] = useState(null)
  const [cantidad, setCantidad] = useState('')
  const [filas, setFilas] = useState([])
  const [soloLectura, setSoloLectura] = useState(false)

  // Modo edicion de comprobante
  useEffect(() => {
    async function loadInvoice() {
      if (params.id) {
        setSoloLectura(true)
        try {
          const res = await getInvoice(params.id)
          const fechaFormateada = moment(res.fechaEmision).format('YYYY-MM-DD')
          setValue('tipoComprobante', res.tipoComprobante)
          setValue('descripcion', res.descripcion)
          setValue('estado', res.estado)
          setValue('fechaEmision', fechaFormateada)
          setValue('importe', res.importe)
          setValue('tasaDeCambio', res.tasaDeCambio)
          setValue('cliente', res.cliente._id)
          setValue('condicionPago', res.condicionPago)
          if (res.condicionPago === 'CON') {
            setContado(true)
            setValue('instrumento', res.instrumento)
          }
          setValue('listaPrecio', res.listaPrecio)

          // Buscar el detalle de la factura
          const detalle = await getInvoiceItem(params.id)

          let i = 0
          let listaDeItems = []
          for (const elem of detalle) {
            const nuevaFila = {
              id: i,
              idProducto: elem._id,
              descripcion: elem.productoId.descripcion,
              cantidad: elem.cantidad,
              precioUnitario: elem.importe,
              importe: elem.importe,
            }
            listaDeItems.push(nuevaFila)
            i++
          }

          setFilas(listaDeItems)
        } catch (error) {
          console.error(error)
        }
      }
    }
    loadInvoice()
  }, [])

  async function loadCondicionPago(valor) {
    try {
      const res = await getDatoCodigoRequest(valor)
      setCondicionPago(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Trae el dato codigo solicitado
  async function loadDatoCodigo(valor) {
    try {
      const res = await getDatoCodigoRequest(valor)
      setInstrumentos(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  // Obtiene usuario, condicion de pago y dato Codigo
  useEffect(() => {
    async function loadUsers() {
      getUsers()
    }
    loadUsers()
    loadCondicionPago('CONPAGO')
    loadDatoCodigo('INSTFINANC')
  }, [])

  // Obtiene los tipos de comprobantes
  useEffect(() => {
    async function loadTiposComprobantes() {
      try {
        getTiposComprob()
      } catch (error) {
        console.log(error)
      }
    }
    loadTiposComprobantes()
    getEstados()
  }, [])

  // Obtiene la listas de precios
  useEffect(() => {
    async function loadListasDePrecios() {
      try {
        await getListasDePrecio()
      } catch (error) {
        console.error(error)
      }
    }

    loadListasDePrecios()
  }, [])

  // Funcion de carga o actualizacion del comprobante
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      uploadInvoice(params.id, data)
    } else {
      let detalleitems = []

      for (const item of filas) {
        const itemInsertar = {
          productoId: item.productoID,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          importe: item.importe,
        }
        detalleitems.push(itemInsertar)
      }
      data.data = detalleitems

      createInvoice(data)
    }
    mostrarMensajeExito()
    //navigate('/invoices')
  })

  // Seteo del usuario
  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value)
  }

  // Seteo condicion de pago, si es de contado
  const handleSelectChangeCondicion = (event) => {
    if (event === 'CON') {
      setContado(true)
    } else setContado(false)
  }

  // Carga el combo de productos con los que pertenezcan a la lista de precio seleccionada
  const cargarItems = async (listaId) => {
    try {
      const res = await getListaPrecioItems(listaId)
      setProductos(res)
    } catch (error) {
      console.error(error)
    }
  }

  // Agrega una fila a la tabla de items
  const insertar = () => {
    const productoId = productos.find(
      (p) => p.productoId._id === productoSelect
    )

    const importe = productoId.importe * cantidad
    const nuevaFila = {
      id: filas.length + 1,
      idProducto: productoId._id,
      descripcion: productoId.productoId.descripcion,
      cantidad: cantidad,
      precioUnitario: productoId.importe,
      importe: importe,
      productoID: productoId.productoId._id,
    }

    // Actualiza el estado utilizando una función para asegurar que estás trabajando con el estado más reciente
    setFilas((prevFilas) => [...prevFilas, nuevaFila])

    setProductoSelect('')
    setCantidad('')
  }

  // Cuando se modifica la cantidad de filas, se hace la sumatoria
  useEffect(() => {
    // Calcula la sumatoria después de haber actualizado el estado
    let sumatoriaTotal = 0
    for (const item of filas) {
      sumatoriaTotal += item.importe
    }
    // Actualiza cualquier otra lógica que dependa de la sumatoria aquí
    setValue('importe', sumatoriaTotal)
  }, [filas]) // Se ejecutará cada vez que filas se actualice

  const handleDelete = (filaId) => {
    setFilas(filas.filter((fila) => fila.id !== filaId))
  }

  const handleProductoSelect = (valor) => {
    setProductoSelect(valor)
  }

  // Modales y mensajes de confirmacion
  // Función para mostrar un mensaje de éxito
  const mostrarMensajeExito = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'La operación se completó con éxito.',
    }).then((result) => {
      if (result.isConfirmed){
        navigate('/invoices')
      }  
    })
  }

  return (
    <div className="flex h-auto items-center justify-center">
      {/*h-[calc(80vh-30px)]*/}
      <div className="bg-zinc-800 w-full h-auto p-5 rounded-md text-center">
        <h3 className="text-white text-2xl text-center mb-2 font-bold">
          Agregar Factura
        </h3>

        <div className="flex justify-end">
          <Link
            to="/invoices"
            className="w-auto bg-blue-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-500"
          >
            Ver Facturas
          </Link>
        </div>

        <form onSubmit={onSubmit}>
          <div className="grid md:grid-cols-3 sm:grid-cols-1">
            {/** TIPO DE COMPROBANTE */}
            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                {' '}
                Tipo de Comprobante:{' '}
              </label>
              <select
                name="tipoComprobante"
                {...register('tipoComprobante', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                disabled={soloLectura}
              >
                <option value="">Selecciona un Tipo de Comprobante</option>
                {tipoComprob.map((tipo) => (
                  <option key={tipo._id} value={tipo.tipoComprobanteID}>
                    {tipo.descripcion}
                  </option>
                ))}
              </select>

              {errors.tipoComprobante && (
                <p className=" w-full text-red-500">
                  tipo de comprobante is required
                </p>
              )}
            </div>

            {/** ESTADO DEL COMPROBANTE */}
            <div className="mr-3">
              <label className="text-white  flex font-bold text-md text-left">
                {' '}
                Estado:{' '}
              </label>
              <select
                name="estado"
                {...register('estado', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                disabled={soloLectura}
              >
                <option value="">Selecciona un Estado</option>
                {estados.map((estado) => (
                  <option key={estado._id} value={estado._id}>
                    {estado.descripcion}
                  </option>
                ))}
              </select>

              {errors.estado && (
                <p className=" w-full text-red-500"> Estado is required</p>
              )}
            </div>

            {/** FECHA EMISION */}
            <div className="mr-3">
              <label className="text-white  flex font-bold text-md text-left">
                {' '}
                Fecha Emisión:{' '}
              </label>
              <input
                type="date"
                placeholder="Fecha Emisión"
                name="fechaEmision"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                readOnly={soloLectura}
                {...register('fechaEmision', { required: true })}
              />

              {errors.fechaEmision && (
                <p className=" w-full text-red-500"> Fecha is required</p>
              )}
            </div>

            {/**TASA DE CAMBIO */}
            <div className="mr-3">
              <label className="text-white  flex font-bold text-md text-left">
                {' '}
                Tasa de Cambio:{' '}
              </label>
              <input
                type="number"
                placeholder="Tasa de Cambio"
                name="tasaDeCambio"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                readOnly={soloLectura}
                {...register('tasaDeCambio', { required: true })}
              />

              {errors.tasaDeCambio && (
                <p className=" w-full text-red-500">
                  {' '}
                  tasa de cambio is required
                </p>
              )}
            </div>

            {/**CLIENTE */}
            <div className="mr-3">
              <label className="text-white  flex font-bold text-md text-left">
                {' '}
                Cliente:{' '}
              </label>
              <select
                value={selectedUser}
                onChange={handleSelectChange}
                {...register('cliente', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                disabled={soloLectura}
              >
                <option value="">Selecciona una cliente</option>
                {user.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>

              {errors.cliente && (
                <p className=" w-auto text-red-500"> Cliente is required</p>
              )}
            </div>

            {/** CONDICION DE PAGO */}
            <div className="mr-3">
              <label className="text-white  flex font-bold text-md text-left">
                Condición de Pago:
              </label>
              <select
                onClick={(e) => {
                  const valorSelect = e.target.value
                  handleSelectChangeCondicion(valorSelect)
                }}
                {...register('condicionPago', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                disabled={soloLectura}
              >
                <option value="">Selecciona Condición de Pago</option>
                {condicionPago.map((condicion) => (
                  <option key={condicion._id} value={condicion.datoCodigo}>
                    {condicion.valorTexto}
                  </option>
                ))}
              </select>
              {errors.condicionPago && (
                <p className="w-auto text-red-500">
                  Condicion de Pago es Requerida
                </p>
              )}
              {contado && (
                <select
                  {...register('instrumento', { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                  disabled={soloLectura}
                >
                  <option value="">Selecciona Instrumento Financiero</option>
                  {instrumentos.map((instrumento) => (
                    <option
                      key={instrumento._id}
                      value={instrumento.datoCodigo}
                    >
                      {instrumento.valorTexto}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* LISTA DE PRECIOS*/}
            <div className="mr-3">
              <label className="text-white  flex font-bold text-md text-left">
                Listas de Precios:
              </label>
              <select
                name="listaPrecio"
                {...register('listaPrecio', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                disabled={soloLectura}
                onChange={(e) => {
                  e.preventDefault()
                  cargarItems(e.target.value)
                }}
              >
                <option value="">Seleccione una Lista de Precio</option>
                {listaPrecio.map((lista) => (
                  <option key={lista._id} value={lista._id}>
                    {lista.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/** IMPORTE */}
          <div className="mr-3">
            <label className="text-white text-2xl font-bold text-md text-left mr-1">
              Importe total: $
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="$0.00"
              name="importe"
              readOnly={true}
              className="w-auto max-w-[200px] text-2xl font-bold bg-zinc-800 text-white px-4 py-2 rounded-md mb-3 mr-2 focus:outline-none"
              {...register('importe', { required: true })}
            />

            {errors.importe && (
              <p className=" w-full text-red-500"> Importe is required</p>
            )}
          </div>

          {/** FUNCIONALIDAD PARA AGREGAR ITEMS A LA TABLA */}
          <div className="flex w-full">
            {/* PRODUCTOS DE LA LISTA DE PRECIO SELECCIONADA*/}
            <div className="block w-full p-2">
              <label className="text-white  flex font-bold text-md text-left">
                Productos:
              </label>
              <select
                name="productos"
                {...register('productos', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                disabled={soloLectura}
                onChange={(e) => {
                  e.preventDefault()
                  const valor = e.target.value
                  handleProductoSelect(valor)
                }}
              >
                <option value="">Seleccione un Producto</option>
                {productos.map((producto) => (
                  <option key={producto._id} value={producto.productoId._id}>
                    {producto.productoId.descripcion}
                  </option>
                ))}
              </select>
            </div>

            {/** CANTIDAD DEL PRODCUTO */}
            <div className="block w-full p-2">
              <label className="text-white font-bold">Cantidad</label>
              <input
                type="number"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                readOnly={soloLectura}
                placeholder="0.00"
                value={cantidad}
                onChange={(e) => {
                  const cantidadSeleccionada = e.target.value
                  setCantidad(cantidadSeleccionada)
                }}
              />
            </div>

            <div className="block w-auto py-8">
              <button
                className="bg-lime-700 rounded-md p-2 hover:bg-lime-500"
                disabled={soloLectura}
                onClick={(e) => {
                  e.preventDefault()
                  insertar()
                }}
              >
                Agregar
              </button>
            </div>
          </div>

          <ItemsTable
            filas={filas}
            handleDelete={handleDelete}
            soloLectura={soloLectura}
          />

          <label className="text-white  flex font-bold text-md text-left">
            {' '}
            Descripción:{' '}
          </label>
          <textarea
            name="descripcion"
            rows="3"
            placeholder="Descripción"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-6 mr-1"
            {...register('descripcion', { required: true })}
          ></textarea>

          {errors.descripcion && (
            <p className=" w-full text-red-500"> descripción is required</p>
          )}

          <BotonGuardar />
        </form>
      </div>
    </div>
  )
}

export default InvoiceFormPage
