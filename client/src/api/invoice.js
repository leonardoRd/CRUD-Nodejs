import axios from './axios'

const API = 'http://localhost:4000/api'

// Obtiene las facturas dados los filtros en la pagina
export const getInvoicesRequest = (tipoComprobante, cliente) =>
  axios.get(
    `/invoices${tipoComprobante ? `?tipoComprobante=${tipoComprobante}` : ''}${
      cliente ? `${tipoComprobante ? '&' : '?'}cliente=${cliente}` : ''
    }`
  )

// Obtiene la factura por id
export const getInvoiceRequest = (id) => axios.get(`/invoice/${id}`)

// Obtiene el detalle de la factura
export const getInvoiceItemRequest = (id) => axios.get(`/invoiceItem/${id}`)

// Crea una nueva Factura
export const createInvoiceRequest = (invoice) => axios.post(`/invoice`, invoice)

// Actualiza una factura
export const updateInvoiceRequest = (id, invoice) =>
  axios.put(`/invoice/${id}`, invoice)

// Borra una factura. OBSERVACION: tambien deberia borrar todo el detalle
export const deleteInvoiceRequest = (id) => axios.delete(`/invoice/${id}`)

// Obtiene todos los usuarios
export const getUsersRequest = () => axios.get(`/users`)

// Obtiene un usuario pasado por id
export const getUserRequest = (id) => axios.get(`/user/${id}`)
