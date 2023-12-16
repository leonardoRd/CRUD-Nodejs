import axios from './axios'

const API = 'http://localhost:4000/api'

// Obtener todos los datos codigos
export const getDatoCodigosRequest = async () => await axios.get(`/datoCodigos`)

// Obtener los datos codigos por condicion
export const getDatoCodigoRequest = async (datoComun, datoCodigo) =>
  await axios.get('/datoCodigo', {
    params: {
      datoComun: datoComun,
      datoCodigo: datoCodigo,
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
) =>
  await axios.put('/datoCodigo', null, {
    params: { datoComun: datoComun, datoCodigo: datoCodigo },
    data: nuevosValores,
  })

// Borra los datos condigo por condicion
export const deleteDatoCodigoRequest = async (datoComun, datoCodigo) =>
  await axios.delete('/datoCodigo', {
    params: {
      datoComun: datoComun,
      datoCodigo: datoCodigo,
    },
  })
