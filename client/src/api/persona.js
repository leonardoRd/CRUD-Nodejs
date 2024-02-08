import axios from './axios'

const API = 'http://localhost:4000/api'

export const getPersonasRequest = () => axios.get(`/personas`)

export const getPersonaRequest = (id) => axios.get(`/personas/${id}`)

export const createPersonaRequest = (persona) =>
  axios.post(`/personas`, persona)

export const updatePersonaRequest = (id, persona) =>
  axios.put(`/personas/${id}`, persona)

export const deletePersonaRequest = (id) => axios.delete(`/personas/${id}`)
