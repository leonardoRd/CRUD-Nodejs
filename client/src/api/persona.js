import axios from './axios'

const API = 'http://localhost:4000/api'

export const getPersonasRequest = () => axios.get(`/personas`)

export const getPersonaRequest = (id) => axios.get(`/persona/${id}`)

export const createPersonaRequest = (persona) => axios.post(`/persona`, persona)

export const updatePersonaRequest = (id, persona) =>
  axios.put(`/persona/${id}`, persona)

export const deletePersonaRequest = (id) => axios.delete(`/persona/${id}`)
