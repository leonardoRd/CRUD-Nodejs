import { useForm } from 'react-hook-form'
import { useEstados } from '../context/estadosContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

function EstadosFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const { createEstado } = useEstados()

  const onSubmit = handleSubmit(async (data) => {
    createEstado(data)
    navigate('/estados')
  })

  return (
    <div className="flex h-[calc(100vh-50px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md text-center">
        <h3 className="text-white text-2xl text-center mb-3 font-bold">
          Agregar Estado
        </h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="estadoID"
            placeholder="Nombre del Estado"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register('estadoID', { required: true })}
          />
          {errors.estadoID && <p>El Nombre del estado es requerido</p>}

          <textarea
            name="descripcion"
            rows="3"
            placeholder="Descripción del estado"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
            {...register('descripcion', { required: true })}
          ></textarea>
          {errors.descripcion && <p>La descripción es requerida</p>}

          <button className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-zinc-500">
            Aceptar
          </button>
        </form>
      </div>
    </div>
  )
}

export default EstadosFormPage
