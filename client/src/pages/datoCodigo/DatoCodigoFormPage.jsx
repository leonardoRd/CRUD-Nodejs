import { useEffect, useState } from 'react'
import {
  createDatoCodigoRequest,
  uploadDatoCodigoRequest,
  getDatoCodigoRequest,
} from '../../api/datoCodigo'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import BotonGuardar from '../../components/BotonGuardar'

function DatoCodigoFormPage() {
  const { register, handleSubmit, setValue, formState: errors } = useForm()
  const [filas, setFilas] = useState([])

  const navigate = useNavigate()
  const params = useParams()

  const agregarFila = () => {
    setFilas([
      ...filas,
      {
        id: filas.length + 1,
        datoCodigo: '',
        valorTexto: '',
        valorNumerico: '',
        valorBoolean: '',
        nuevo: '',
      },
    ])
  }

  const handleChange = (id, valor, columna) => {
    switch (columna) {
      case 1:
        setFilas((prevFilas) =>
          prevFilas.map((fila) =>
            fila.id === id ? { ...fila, datoCodigo: valor } : fila
          )
        )
        break
      case 2:
        setFilas((prevFilas) =>
          prevFilas.map((fila) =>
            fila.id === id ? { ...fila, valorTexto: valor } : fila
          )
        )
        break
      case 3:
        setFilas((prevFilas) =>
          prevFilas.map((fila) =>
            fila.id === id ? { ...fila, valorNumerico: valor } : fila
          )
        )
        break
      case 4:
        setFilas((prevFilas) =>
          prevFilas.map((fila) =>
            fila.id === id ? { ...fila, valorBoolean: valor } : fila
          )
        )
        break
    }
  }
  const obtenerValores = () => {
    // Aquí puedes acceder a los valores de cada fila
    console.log('Valores de las filas:', filas)
  }

  useEffect(() => {
    async function loadDatoCodigo() {
      try {
        const res = await getDatoCodigoRequest(params.id)
        setValue('datoComun', params.id)
        const datos = res.data
        datos.forEach((element) => {
          // Utilizar el método de array `map` para obtener un nuevo array de filas
          const nuevasFilas = datos.map((element, index) => ({
            id: index + 1, // Otra opción sería usar un ID único si lo tienes disponible
            datoCodigo: element.datoCodigo,
            valorTexto: element.valorTexto,
            valorNumerico: element.valorNumerico,
            valorBoolean: element.valorBoolean,
            nuevo: 'N',
          }))

          // Actualizar el estado con el nuevo array de filas
          setFilas(nuevasFilas)
        })
      } catch (error) {
        console.error(error)
      }
    }
    if (params.id) loadDatoCodigo()
  }, [])

  // Carga de los datos
  const onSubmit = handleSubmit(async (data) => {
    filas.forEach(async (fila) => {
      try {
        const { datoComun, descripcion } = data
        const { datoCodigo, valorTexto, valorNumerico, valorBoolean } = fila

        if (fila.nuevo === 'N') {
          const res = await uploadDatoCodigoRequest(datoComun, datoCodigo, {
            datoComun,
            datoCodigo,
            valorTexto,
            valorNumerico,
            valorBoolean,
            descripcion,
          })
        } else {
          const res = await createDatoCodigoRequest({
            datoComun,
            datoCodigo,
            valorTexto,
            valorNumerico,
            valorBoolean,
            descripcion,
          })
        }
      } catch (error) {
        console.log(error)
      }
    })
    navigate('/datoCodigo')
  })

  return (
    <div className="flex h-auto items-center justify-center">
      <div className="bg-zinc-800 w-full h-auto p-5 rounded-md text-center">
        {/* Titulo */}
        <h3 className="text-white text-2xl text-center mb-3 font-bold">
          Agregar Dato Código
        </h3>
        <button
          onClick={agregarFila}
          className="bg-lime-700 rounded-md p-2 hover:bg-lime-500"
        >
          Agregar Fila
        </button>

        {/* Formulario */}
        <form onSubmit={onSubmit}>
          <div className="grid md:grid-cols-1 sm:grid-cols-1">
            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Descrición para búsqueda
              </label>
              <input
                type="text"
                placeholder="Descrición para búsqueda"
                name="descripcion"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('descripcion', { required: true })}
              />
              {errors.descripcion && (
                <p className=" w-full text-red-500">Descripcion es requerida</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-1 sm:grid-cols-1">
            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Dato Común
              </label>
              <input
                type="text"
                placeholder="Ingrese el Dato Común"
                name="datoComun"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('datoComun', { required: true })}
              />
              {errors.datoComun && (
                <p className=" w-full text-red-500">Dato Comun es requerida</p>
              )}
            </div>
          </div>

          <div>
            <table className="min-w-full justify-center text-center max-w-full">
              <thead>
                <tr>
                  <th>ID</th>

                  <th>Dato Código</th>
                  <th>Valor Texto</th>
                  <th>Valor Numerico</th>
                  <th>Valor Booleano</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((fila) => (
                  <tr key={fila.id}>
                    <td>{fila.id}</td>

                    <td>
                      <input
                        type="text"
                        value={fila.datoCodigo}
                        name={`datoCodigo-${fila.id}`}
                        onChange={(e) =>
                          handleChange(fila.id, e.target.value, 1)
                        }
                        className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={fila.valorTexto}
                        name={`valorTexto-${fila.id}`}
                        onChange={(e) =>
                          handleChange(fila.id, e.target.value, 2)
                        }
                        className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={fila.valorNumerico}
                        name={`valorNumerico-${fila.id}`}
                        onChange={(e) =>
                          handleChange(fila.id, e.target.value, 3)
                        }
                        className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={fila.valorBoolean}
                        name={`valorBoolean-${fila.id}`}
                        onChange={(e) =>
                          handleChange(fila.id, e.target.checked, 4)
                        }
                        className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={obtenerValores} hidden>
              Obtener Valores
            </button>
          </div>

          <BotonGuardar />
        </form>
      </div>
    </div>
  )
}

export default DatoCodigoFormPage
