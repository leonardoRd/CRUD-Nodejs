import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPersonasRequest, deletePersonaRequest } from '../../api/persona'
import PersonaTable from '../../components/PersonaTable'

function PersonaPage() {
  const [personas, setPersonas] = useState([])

  useEffect(() => {
    async function loadPersonas() {
      try {
        const res = await getPersonasRequest()
        setPersonas(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    loadPersonas()
  }, [])

  const deletePersona = async (id) => {
    try {
      const res = await deletePersonaRequest(id)
      if (res.status === 200)
        setPersonas(personas.filter((persona) => persona._id != id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className="font-bold text-2xl text-white pb-5 text-center">
        Personas
      </h1>

      <div className="flex justify-end">
        <Link
          to="/add-persona"
          className="w-auto bg-blue-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-500"
        >
          Agregar Persona
        </Link>
      </div>

      <div className="overflow-x-auto flex items-center justify-center">
        <table
          border="1"
          className="min-w-full table-auto justify-center text-center max-w-full"
        >
          <thead>
            <tr>
              <th className="text-white px-4 border-x-2 border-cyan-400"hidden>ID</th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Razón Social
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                DNI
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                CUIT
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                edad
              </th>
              <th className="text-white px-4 border-x-2 border-cyan-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) => (
              <PersonaTable
                persona={persona}
                deletePersona={deletePersona}
                key={persona._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PersonaPage
