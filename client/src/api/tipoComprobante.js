import axios from './axios'

const API = 'http://localhost:4000/api'

export const getTiposComprobRequest = () => axios.get(`/tiposComprobantes`)

export const getTipoComprobRequest = (id) => axios.get(`/tipoComprobante/${id}`)

export const createTipoComprobRequest = (tipoComprob) =>
  axios.post(`/tipoComprobante`, tipoComprob)

export const updateTipoComprobRequest = (id, tipoComprob) =>
  axios.put(`/tipoComprobante/${id}`, tipoComprob)

export const deleteTipoComprobRequest = (id) =>
  axios.delete(`/tipoComprobante/${id}`)
