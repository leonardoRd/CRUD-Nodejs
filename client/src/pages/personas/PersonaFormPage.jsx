import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import BotonGuardar from '../../components/BotonGuardar'
import {
  createPersonaRequest,
  getPersonaRequest,
  updatePersonaRequest,
} from '../../api/persona'
import { useEffect, useState } from 'react'

function PersonaFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const [soloLectura, setSoloLectura] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadPersona() {
      if (params.id) {
        try {
          const res = await getPersonaRequest(params.id)
          setValue('razonSocial', res.data.razonSocial)
          setValue('numeroDocumento', res.data.numeroDocumento)
          setValue('codigoFiscal', res.data.codigoFiscal)
          setValue('codigoPostal', res.data.codigoPostal)
          setValue('ciudad', res.data.ciudad)
          setValue('pais', res.data.pais)
          setValue('edad', res.data.edad)
          setValue('email', res.data.email)
          setValue('telefono', res.data.telefono)
          setSoloLectura(true)
        } catch (error) {
          console.error(error)
        }
      }
    }

    loadPersona()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updatePersonaRequest(params.id, data)
      } else {
        await createPersonaRequest(data)
      }
      navigate('/personas')
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div className="flex h-auto items-center justify-center">
      <div className="bg-zinc-800 w-full h-auto p-5 rounded-md text-center">
        {/*Titulo*/}
        <h3 className="text-white text-2xl text-center mb-3 font-bold">
          Formulario Personas
        </h3>

        <div className="flex justify-start">
          <Link
            to="/personas"
            className="w-auto bg-blue-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-500"
          >
            Personas
          </Link>
        </div>

        <form onSubmit={onSubmit}>
          {/*DATOS DE LA CABECERA DE LA LISTA DE PRECIO */}

          <div className="grid md:grid-cols-3 sm:grid-cols-1">
            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Razón Social:
              </label>
              <input
                type="text"
                placeholder="Razón Social"
                name="razonSocial"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('razonSocial', { required: true })}
                disabled={soloLectura}
              />
              {errors.razonSocial && (
                <p className=" w-full text-red-500">
                  Razón Social es requerida
                </p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Número Documento:
              </label>
              <input
                type="text"
                placeholder="Número Documento"
                name="numeroDocumento"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('numeroDocumento', { required: true })}
                disabled={soloLectura}
              />
              {errors.numeroDocumento && (
                <p className=" w-full text-red-500">
                  Número de Documento es requerido
                </p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Código Fiscal:
              </label>
              <input
                type="text"
                placeholder="Código Fiscal"
                name="codigoFiscal"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('codigoFiscal', { required: true })}
                disabled={soloLectura}
              />
              {errors.codigoFiscal && (
                <p className=" w-full text-red-500">
                  Código fiscal es requerido
                </p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Correo Eletrónico:
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('email', { required: true })}
                disabled={soloLectura}
              />
              {errors.email && (
                <p className=" w-full text-red-500">Correo es requerido</p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Teléfono:
              </label>
              <input
                type="text"
                placeholder="Teléfono"
                name="telefono"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('telefono', { required: true })}
              />
              {errors.telefono && (
                <p className=" w-full text-red-500">Teléfono es requerido</p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Edad:
              </label>
              <input
                type="number"
                placeholder="Edad"
                name="edad"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('edad', { required: true })}
                disabled={soloLectura}
              />
              {errors.edad && (
                <p className=" w-full text-red-500">Edad es requerido</p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Pais:
              </label>
              <input
                type="text"
                placeholder="Pais"
                name="pais"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('pais', { required: true })}
                disabled={soloLectura}
              />
              {errors.pais && (
                <p className=" w-full text-red-500">Pais es requerido</p>
              )}
            </div>
            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Ciudad:
              </label>
              <input
                type="text"
                placeholder="Ciudad"
                name="ciudad"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('ciudad', { required: true })}
              />
              {errors.ciudad && (
                <p className=" w-full text-red-500">Ciudad es requerido</p>
              )}
            </div>
            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Código Postal:
              </label>
              <input
                type="text"
                placeholder="Código Postal"
                name="codigoPostal"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('codigoPostal', { required: true })}
              />
              {errors.codigoPostal && (
                <p className=" w-full text-red-500">
                  Código Postal es requerido
                </p>
              )}
            </div>
          </div>
          <BotonGuardar />
        </form>
      </div>
    </div>
  )
}

export default PersonaFormPage
