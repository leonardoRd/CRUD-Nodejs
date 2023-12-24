import axios from './axios'

const API = 'http://localhost:4000/api'

// Obtener todos los datos codigos
export const getDatoCodigosRequest = async (datoComun, datoCodigo) =>
  await axios.get(
    `/datoCodigos${datoComun ? `?datoComun=${datoComun}` : ''}${
      datoCodigo ? `${datoComun ? '&' : '?'}datoCodigo=${datoCodigo}` : ''
    }`
  )

// Obtener los datos codigos por condicion
export const getDatoCodigoRequest = async (datoComun) =>
  await axios.get('/datoCodigo', {
    params: {
      datoComun: datoComun,
    },
  })

// Crear dato codigo
export const createDatoCodigoRequest = async (datoCodigo) => {
  console.log(datoCodigo)
  await axios.post(`/datoCodigo`, datoCodigo)
}

// actualiza los datos codigo por condicion
export const uploadDatoCodigoRequest = async (
  datoComun,
  datoCodigo,
  nuevosValores
) => {
  await axios.put('/datoCodigo', JSON.stringify(nuevosValores), {
    params: { datoComun: datoComun, datoCodigo: datoCodigo },
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// Borra los datos condigo por condicion
export const deleteDatoCodigoRequest = async (datoComun, datoCodigo) =>
  await axios.delete('/datoCodigo', {
    params: {
      datoComun: datoComun,
      datoCodigo: datoCodigo,
    },
  })
