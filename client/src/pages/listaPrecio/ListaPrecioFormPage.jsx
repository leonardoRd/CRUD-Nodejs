import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useProducto } from '../../context/productosContext'
import BotonGuardar from '../../components/BotonGuardar'
import { useListaPrecio } from '../../context/listaPrecioContext'
import moment from 'moment'
import { updateListaPrecio } from '../../../../src/controllers/listaPrecio.controller'

function ListaPrecioFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { getProductos, productos } = useProducto()
  const {
    createListaPrecio,
    getListaPrecioItems,
    getListaPrecio,
    updateListaPrecio,
  } = useListaPrecio()
  const [filas, setFilas] = useState([])

  // Tres variables para almacenar los datos
  const [product, setProduct] = useState('')
  const [importe, setImporte] = useState(0)
  const [impuesto, setImpuesto] = useState(0)
  const navigate = useNavigate()
  const params = useParams()

  // Ejecucion de funciones cuando se carga la pagina
  useEffect(() => {
    async function loadProductos() {
      try {
        const res = await getProductos()
      } catch (error) {
        console.error(error)
      }
    }

    async function loadListaPrecio() {
      try {
        const res = await getListaPrecio(params.id)
        const fechaVigenciaFormateada = moment(res.fechaVigencia).format(
          'YYYY-MM-DD'
        )
        const fechaExpiracionFormateada = moment(res.fechaExpiracion).format(
          'YYYY-MM-DD'
        )
        // Asignar los valores de la cabecera de la lista de Precio
        setValue('descripcion', res.descripcion)
        setValue('fechaVigencia', fechaVigenciaFormateada)
        setValue('fechaExpiracion', fechaExpiracionFormateada)
      } catch (error) {
        console.error(error)
      }
    }

    loadProductos()

    if (params.id) {
      loadListaPrecio()
    }
  }, [])

  // Para la carga del array de filas, todos los items
  useEffect(() => {
    async function loadListaPrecioItem() {
      let arrayAux = []
      try {
        const res = await getListaPrecioItems(params.id)
        res.forEach((data, i) => {
          let filaInsertar = {
            id: i,
            listaPrecioItemId: data._id,
            idProducto: data.productoId._id,
            producto: data.productoId.descripcion,
            importe: data.importe,
            impuesto: data.impuesto,
          }

          arrayAux.push(filaInsertar)
        })
        setFilas(arrayAux)
      } catch (error) {
        console.error(error)
      }
    }
    if (params.id) loadListaPrecioItem()
  }, [])

  const insertar = () => {
    const productoId = productos.find((p) => p.descripcion === product)
    setFilas([
      ...filas,
      {
        id: filas.length + 1,
        listaPrecioItemId: '',
        idProducto: productoId._id,
        producto: product,
        importe: importe,
        impuesto: impuesto,
      },
    ])
    setProduct('')
    setImporte('')
    setImpuesto('')
  }

  const handleChange = (e, filaId, valor) => {
    const arrayActualizado = filas.map((fila) => {
      if (fila.id === filaId) {
        // Actualiza solo la propiedad importe del objeto con el id coincidente
        if (valor === 'a') return { ...fila, importe: e.target.value }
        else return { ...fila, impuesto: e.target.value }
      } else {
        // Retorna el objeto sin cambios para las filas que no coinciden con el id
        return fila
      }
    })
    setFilas(arrayActualizado)
  }

  // Funcion para actualizar o agregar una lista de precio
  const onSubmit = handleSubmit(async (data) => {
    let listaProductos = []
    filas.forEach((fila, i) => {
      let nuevoProducto = {
        id: fila.listaPrecioItemId,
        productoId: fila.idProducto,
        importe: fila.importe,
        impuesto: fila.impuesto,
      }
      listaProductos.push(nuevoProducto)
    })
    data.data = listaProductos
    console.log(data)
    try {
      if (!params.id) {
        const res = await createListaPrecio(data)
        alert('Agregado correctamente!')
      } else {
        const res = await updateListaPrecio(params.id, data)
        alert('Se actualizó correctamente!')
      }
      navigate('/listaPrecio')
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div className="flex h-auto items-center justify-center">
      <div className="bg-zinc-800 w-full h-auto p-5 rounded-md text-center">
        {/*Titulo*/}
        <h3 className="text-white text-2xl text-center mb-3 font-bold">
          Agregar Lista de Precio
        </h3>

        <div className="flex justify-start">
          <Link
            to="/listaPrecio"
            className="w-auto bg-blue-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-500"
          >
            Listas de Precios
          </Link>
        </div>

        <form onSubmit={onSubmit}>
          {/*DATOS DE LA CABECERA DE LA LISTA DE PRECIO */}

          <div className="grid md:grid-cols-3 sm:grid-cols-1">
            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Descripción de Lista de Precio:
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

            {/* <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Incluye Impuestos
              </label>
              <input
                type="checkbox"
                name="incluyeImpuesto"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('incluyeImpuesto')}
              />
            </div> */}

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Fecha de Vigencia:
              </label>
              <input
                type="date"
                name="fechaVigencia"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('fechaVigencia', { required: true })}
              />
              {errors.fechaVigencia && (
                <p className=" w-full text-red-500">
                  Fecha de vigencia es requerida
                </p>
              )}
            </div>

            <div className="mr-3">
              <label className="text-white flex font-bold text-md text-left">
                Fecha de Expiracion:
              </label>
              <input
                type="date"
                name="fechaExpiracion"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                {...register('fechaExpiracion', { required: true })}
              />
              {errors.fechaExpiracion && (
                <p className=" w-full text-red-500">
                  Fecha de expiración es requerida
                </p>
              )}
            </div>
          </div>

          {/*DATOS DEL DETALLE DE LA LISTA DE PRECIO */}
          <h3 className="text-white font-bold p-5">Productos</h3>
          <div className="flex w-full p-5">
            <div className="block w-full p-2">
              <label className="text-white font-bold">Productos</label>
              <select
                name="prod"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                onChange={(e) => {
                  const valorSeleccionado = e.target.value
                  setProduct(valorSeleccionado)
                }}
                value={product}
              >
                <option value="">Seleccione un producto</option>
                {productos.map((producto) => (
                  <option key={producto._id} value={producto.descripcion}>
                    {producto.descripcion}
                  </option>
                ))}
              </select>
            </div>

            <div className="block w-full p-2">
              <label className="text-white font-bold">Importe</label>
              <input
                type="number"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                placeholder="0.00"
                value={importe}
                onChange={(e) => {
                  const valorSeleccionado = e.target.value
                  setImporte(valorSeleccionado)
                }}
              />
            </div>
            <div className="block w-full p-2">
              <label className="text-white font-bold">Impuesto</label>
              <input
                type="number"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                placeholder="0.00"
                value={impuesto}
                onChange={(e) => {
                  const valorSeleccionado = e.target.value
                  setImpuesto(valorSeleccionado)
                }}
              />
            </div>
            <div className="block w-auto py-8">
              <button
                className="bg-lime-700 rounded-md p-2 hover:bg-lime-500"
                onClick={(e) => {
                  e.preventDefault()
                  insertar()
                }}
              >
                Insertar
              </button>
            </div>
          </div>

          <table
            border="1"
            className="min-w-full table-auto justify-center text-center max-w-full"
          >
            <thead>
              <tr>
                <th className="text-white px-4 border-x-2 border-cyan-400">
                  ID
                </th>
                <th className="text-white px-4 border-x-2 border-cyan-400">
                  Producto
                </th>
                <th className="text-white px-4 border-x-2 border-cyan-400">
                  Importe
                </th>
                <th className="text-white px-4 border-x-2 border-cyan-400">
                  Impuesto
                </th>
              </tr>
            </thead>
            <tbody>
              {filas.map((fila) => (
                <tr key={fila.id}>
                  <td>{fila.id}</td>
                  <td>
                    <input
                      type="text"
                      value={fila.producto}
                      name={`producto-${fila.id}`}
                      className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={fila.importe}
                      name={`importe-${fila.id}`}
                      className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                      onChange={(e) => handleChange(e, fila.id, 'a')}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={fila.impuesto}
                      name={`impuesto-${fila.id}`}
                      className="w-auto bg-zinc-700 text-white px-4 py-2 rounded-md mb-3 mr-2"
                      onChange={(e) => handleChange(e, fila.id, 'b')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <BotonGuardar />
        </form>
      </div>
    </div>
  )
}
export default ListaPrecioFormPage
