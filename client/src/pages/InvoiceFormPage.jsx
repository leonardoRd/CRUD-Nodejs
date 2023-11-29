import { useForm } from 'react-hook-form'
import { useInvoice } from '../context/invoiceContext'
import { useTipoComprob } from '../context/tipoComprobContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moment from 'moment'

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

  const navigate = useNavigate()
  const params = useParams()
  const [selectedUser, setSelectedUser] = useState(null)

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
        } catch (error) {
          console.error(error)
        }
      }
    }
    loadInvoice()
  }, [])

  useEffect(() => {
    async function loadUsers() {
      getUsers()
    }
    loadUsers()
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
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      uploadInvoice(params.id, data)
    } else {
      createInvoice(data)
    }
    navigate('/invoices')
  })

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value)
  }

  return (
    <div className="flex h-[calc(100vh-50px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md text-center">
        <h3 className="text-white text-2xl text-center mb-3 font-bold">
          Create Invoice
        </h3>
        <form onSubmit={onSubmit}>
          <select
            name="tipoComprobante"
            {...register('tipoComprobante', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
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
              {' '}
              tipo de comprobante is required
            </p>
          )}

          <textarea
            name="descripcion"
            rows="3"
            placeholder="Descripción"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register('descripcion', { required: true })}
          ></textarea>

          {errors.descripcion && (
            <p className=" w-full text-red-500"> descripción is required</p>
          )}

          <input
            type="text"
            placeholder="Estado"
            name="estado"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register('estado', { required: true })}
          />

          {errors.estado && (
            <p className=" w-full text-red-500"> Estado is required</p>
          )}

          <input
            type="date"
            placeholder="Fecha Emisión"
            name="fechaEmision"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register('fechaEmision', { required: true })}
          />

          {errors.fechaEmision && (
            <p className=" w-full text-red-500"> Fecha is required</p>
          )}

          <input
            type="number"
            placeholder="Importe"
            name="importe"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register('importe', { required: true })}
          />

          {errors.importe && (
            <p className=" w-full text-red-500"> Importe is required</p>
          )}

          <input
            type="number"
            placeholder="Tasa de Cambio"
            name="tasaDeCambio"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register('tasaDeCambio', { required: true })}
          />

          {errors.tasaDeCambio && (
            <p className=" w-full text-red-500"> tasa de cambio is required</p>
          )}

          <select
            value={selectedUser}
            onChange={handleSelectChange}
            {...register('cliente', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
          >
            <option value="">Selecciona una cliente</option>
            {user.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>

          {errors.cliente && (
            <p className=" w-full text-red-500"> Cliente is required</p>
          )}

          <button className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-zinc-500">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default InvoiceFormPage
