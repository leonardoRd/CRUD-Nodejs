import { useForm } from 'react-hook-form'
import { useTipoComprob } from '../context/tipoComprobContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BotonGuardar } from "../components/BotonGuardar";

function TipoComprobFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const {
    getTipoComprob,
    getTiposComprob,
    createTipoComprob,
    deleteTipoComprob,
    updateTipoComprob,
    tipoComprob,
  } = useTipoComprob()

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadTipoComprobante() {
      if (params.id) {
        try {
          const res = await getTipoComprob(params.id)
          setValue('tipoComprobanteID', res.tipoComprobanteID)
          setValue('descripcion', res.descripcion)
        } catch (error) {
          console.error(error)
        }
      }
    }
    loadTipoComprobante()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      updateTipoComprob(params.id, data)
    } else {
      createTipoComprob(data)
    }
    navigate('/tiposComprob')
  })

  return (
    <div className="flex h-[calc(70vh-50px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md px-10 py-8 rounded-md text-center">
        <h3 className="text-white text-2xl text-center mb-5 font-bold">
          Agregar Tipo Comprobante
        </h3>
        <form onSubmit={onSubmit}>
          <label className="text-white  flex font-bold text-md text-left">
            {' '}
            Tipo de Comprobante ID:{' '}
          </label>
          <input
            type="text"
            placeholder="Tipo de Comprobante ID"
            name="tipoComprobanteID"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register('tipoComprobanteID', { required: true })}
          />

          {errors.tipoComprobanteID && (
            <p className=" w-full text-red-500">
              {' '}
              tipo de comprobante ID is required
            </p>
          )}

          <label className="text-white  flex font-bold text-md text-left">
            {' '}
            Descripción:{' '}
          </label>
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

          <BotonGuardar/>
          {/* <button className="w-auto bg-blue-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-500">
            Guardar
          </button> */}
        </form>
      </div>
    </div>
  )
}

export default TipoComprobFormPage
