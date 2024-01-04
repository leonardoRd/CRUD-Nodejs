import axios from './axios'

export const getInventarioRequest = () => axios.get(`/inventario`)

export const getInventarioIdRequest = (id) => axios.get(`/inventario/${id}`)

export const createInventarioRequest = (producto) => axios.post(`/inventario`, producto)

export const uploadInventarioRequest = (id, producto) => axios.put(`/inventario/${id}`, producto)

export const deleteInventarioRequest = (id) => axios.delete(`/inventario/${id}`)