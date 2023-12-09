import axios from './axios'

const API = 'http://localhost:4000/api'

export const getProductosRequest = () => axios.get(`/productos`)

export const getProductoRequest = (id) => axios.get(`/producto/${id}`)

export const createProductoRequest = (producto) => axios.post(`/producto`, producto)

export const uploadProductoRequest = (id, producto) => axios.put(`/producto/${id}`, producto)

export const deleteProductoRequest = (id) => axios.delete(`/producto/${id}`)