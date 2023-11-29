import axios from './axios'

const API = 'http://localhost:4000/api'

export const getInvoicesRequest = () => axios.get(`/invoices`)

export const getInvoiceRequest = (id) => axios.get(`/invoice/${id}`)

export const createInvoiceRequest = (invoice) => axios.post(`/invoice`, invoice)

export const updateInvoiceRequest = (id, invoice) =>
  axios.put(`/invoice/${id}`, invoice)

export const deleteInvoiceRequest = (id) => axios.delete(`/invoice/${id}`)

export const getUsersRequest = () => axios.get(`/users`)

export const getUserRequest = (id) => axios.get(`/user/${id}`)
