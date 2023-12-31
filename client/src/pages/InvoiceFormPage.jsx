import { useForm } from 'react-hook-form'
import { useInvoice } from '../context/invoiceContext'
import { useTipoComprob } from '../context/tipoComprobContext'
import { useEstados } from '../context/estadosContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moment from 'moment'
import BotonGuardar from '../components/BotonGuardar'
import { getDatoCodigoRequest } from '../api/datoCodigo'

function InvoiceFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const { createInvoice, invoice, getInvoice, uploadInvoice, user, getUsers } =
    useInvoice()

  const { getTiposComprob, tipoComprob } = useTipoComprob()
  const { getEstados, estados } = useEstados()
  const [condicionPago, setCondicionPago] = useState([])
  const [contado, setContado] = useState(false)
  const [instrumentos, setInstrumentos] = useState([])

  const navigate = useNavigate()
  const params = useParams()
  const [selectedUser, setSelectedUser] = useState(null)

  // Modo edicion de comprobante
  useEffect(() => {
    async function loadInvoice() {
      if (params.id) {
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

  useEffect(() => {
    async function loadUsers() {
      getUsers()
    }
    loadUsers()
    loadCondicionPago('CONPAGO')
    loadDatoCodigo('INSTFINANC')
  }, [])

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

  // Funcion de carga o actualizacion del comprobante
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      uploadInvoice(params.id, data)
    } else {
      createInvoice(data)
    }
    navigate('/invoices')
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

  return (
    <div className="flex h-auto items-center justify-center">
      {/*h-[calc(80vh-30px)]*/}
      <div className="bg-zinc-800 w-full h-auto p-5 rounded-md text-center">
        <h3 className="text-white text-2xl text-center mb-2 font-bold">
          Agregar Factura
        </h3>

        <form onSubmit={onSubmit}>
          <div className="grid md:grid-cols-3 sm:grid-cols-1">
            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                {' '}
                Tipo de Comprobante:{' '}
              </label>
              <select
                name="tipoComprobante"
                {...register('tipoComprobante', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
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

            <div className="mr-3">
              <label className="text-white  flex font-bold text-md text-left">
                {' '}
                Estado:{' '}
              </label>
              <select
                name="estado"
                {...register('estado', { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
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
                {...register('fechaEmision', { required: true })}
              />

              {errors.fechaEmision && (
                <p className=" w-full text-red-500"> Fecha is required</p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white  flex font-bold text-md text-left">
                {' '}
                Importe:{' '}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="$0.00"
                name="importe"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('importe', { required: true })}
              />

              {errors.importe && (
                <p className=" w-full text-red-500"> Importe is required</p>
              )}
            </div>

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
                {...register('tasaDeCambio', { required: true })}
              />

              {errors.tasaDeCambio && (
                <p className=" w-full text-red-500">
                  {' '}
                  tasa de cambio is required
                </p>
              )}
            </div>

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
          </div>

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
