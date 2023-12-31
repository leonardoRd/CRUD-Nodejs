import axios from './axios'

export const getListaPrecioRequest = () => axios.get(`/listaPrecio`)

export const getListaPrecioIdRequest = (id) => axios.get(`/listaPrecio/${id}`)

export const getListaPrecioItemRequest = (id) =>
  axios.get(`/listaPrecioItem/${id}`)

export const createListaPrecioRequest = (listaPrecio) =>
  axios.post(`/listaPrecio`, listaPrecio)

export const uploadListaPrecioRequest = (id, listaPrecio) =>
  axios.put(`/listaPrecio/${id}`, listaPrecio)

export const deleteListaPrecioRequest = (id) =>
  axios.delete(`/listaPrecio/${id}`)

export const deleteListaPrecioItemsRequest = (data) => {
  axios.delete(`/listaPrecioItem`, { data: { ids: data } })
}
