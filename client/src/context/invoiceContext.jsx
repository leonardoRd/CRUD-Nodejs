import { createContext, useContext, useState } from 'react'
import {
  createInvoiceRequest,
  getInvoicesRequest,
  deleteInvoiceRequest,
  getInvoiceRequest,
  updateInvoiceRequest,
  getUsersRequest,
} from '../api/invoice'

export const InvoiceContext = createContext()

export const useInvoice = () => {
  const context = useContext(InvoiceContext)

  if (!context) {
    throw new Error('Use Auth Provider')
  }
  return context
}

export const InvoiceProvider = ({ children }) => {
  const [invoice, setInvoice] = useState([])
  const [user, setUser] = useState([])

  // Aca van todas las funciones
  const getUsers = async () => {
    try {
      const res = await getUsersRequest()
      setUser(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getInvoices = async (tipoComprobante, cliente) => {
    try {
      const res = await getInvoicesRequest(tipoComprobante, cliente)
      setInvoice(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createInvoice = async (invoice) => {
    try {
      const res = await createInvoiceRequest(invoice)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteInvoice = async (id) => {
    try {
      const res = await deleteInvoiceRequest(id)
      if (res.status === 200)
        setInvoice(invoice.filter((invoice) => invoice._id != id))
    } catch (error) {
      console.error(error)
    }
  }

  const getInvoice = async (id) => {
    try {
      const res = await getInvoiceRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const uploadInvoice = async (id, invoice) => {
    try {
      const res = await updateInvoiceRequest(id, invoice)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <InvoiceContext.Provider
      value={{
        createInvoice,
        getInvoice,
        invoice,
        deleteInvoice,
        getInvoices,
        uploadInvoice,
        user,
        getUsers,
        setUser,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}
