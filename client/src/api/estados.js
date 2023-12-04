import axios from './axios'

const API = 'http://localhost:4000/api'

export const getEstadosRequest = () => axios.get('/estados')

export const getEstadoRequest = (id) => axios.get(`/estado/${id}`)

export const createEstadoRequest = (estado) => axios.post(`/estado`, estado)

export const deleteEstadoRequest = (id) => axios.delete(`/estado/${id}`)

export const uploadEstadoRequest = (id, estado) => axios.put(`/estado/${id}`, estado)
