import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { useState } from 'react'

function NavbarOne() {
  const { isAuthenticate, user } = useAuth()
  const [showOptions, setShowOptions] = useState(false)
  const [showOptionsTipo, setShowOptionsTipo] = useState(false)

  const handleToggleOptions = () => {
    setShowOptions(true)
  }
  const handleToggleOptions2 = () => {
    setShowOptions(false)
  }

  const handleToggleOptionsTipo = () => {
    setShowOptionsTipo(true)
  }

  const handleToggleOptionsTipo2 = () => {
    setShowOptionsTipo(false)
  }

  return (
    <nav className="bg-zinc-700 my-3 flex flex-col md:flex-row md:justify-between py-4 px-4 items-center md:px-10 rounded-lg">
      <Link className="w-auto h-auto" to={isAuthenticate ? '/tasks' : '/'}>
        <h1 className="text-white text-2xl font-bold rounded-md mb-2 md:mb-0">
          Tasks Manager
        </h1>
      </Link>

      {isAuthenticate && (
        <ul className="flex flex-col items-center text-center md:flex-row gap-x-2">
          {/* Mensaje del usuario logueado*/}
          <li className="font-bold px-4 py-2 w-full h-full">Bienvenido {user.username}</li>

          {/* Agregar Tareas */}
          <li className="rounded-md bg-zinc-600 px-4 py-2 w-full h-full text-center hover:bg-zinc-500">
            <Link className="w-auto h-[2rem]" to="/add-task">
              Agregar Tareas
            </Link>
          </li>

          {/* Agregar Facturas */}
          <li
            className={`relative block md:inline-block rounded-md bg-zinc-600 px-3 py-2 w-full h-full text-center hover:bg-zinc-500 ${
              showOptions ? 'active' : ''
            }`}
          >
            <div className="w-full h-full" onMouseEnter={handleToggleOptions}>
              <Link className="w-full h-[2rem]"to="/invoices">Facturas</Link>
            </div>

            {/* Menu desplegable de Facturas */}
            {showOptions && (
              <ul className="absolute left-0 mt-2 items-center w-100">
                <li
                  onMouseEnter={handleToggleOptions}
                  onMouseLeave={handleToggleOptions2}
                  className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-auto h-auto"
                >
                  <Link className="w-full h-[2rem]"to="/add-invoice">
                    Agregar Facturas
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Agregar Tipos de Comprobantes */}
          <li
            className={`relative block md:inline-block rounded-md text-center w-full h-auto bg-zinc-600 px-3 py-2 hover:bg-zinc-500 ${
              showOptions ? 'active' : ''
            }`}
          >
            <div
              onMouseEnter={handleToggleOptionsTipo}
              className="w-full text-center"
            >
              <Link className="w-full h-[2rem]" to="/tiposComprob">Tipos de Comprobantes</Link>
            </div>

            {/* Menu desplegable de Tipos de Comprobantes */}
            {showOptionsTipo && (
              <ul className="absolute left-0 mt-2">
                <li
                  onMouseEnter={handleToggleOptionsTipo}
                  onMouseLeave={handleToggleOptionsTipo2}
                  className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-auto"
                >
                  <Link className="w-full h-[2rem]" to="/add-tipoComprob">
                    Agregar Tipos de Comprobantes
                  </Link>
                </li>
                <li
                  onMouseEnter={handleToggleOptionsTipo}
                  onMouseLeave={handleToggleOptionsTipo2}
                  className="block px-4 bg-zinc-600 py-2 w-full hover:bg-zinc-500"
                >
                  <Link className="w-full h-[2rem]" to="/estados">
                    Estados de Comprobantes
                  </Link>
                </li>
                <li
                  onMouseEnter={handleToggleOptionsTipo}
                  onMouseLeave={handleToggleOptionsTipo2}
                  className="block px-4  bg-zinc-600 py-2 w-full hover:bg-zinc-500"
                >
                  <Link className="w-full h-[2rem]" to="/add-estado">
                    Agregar Estados Comprobantes
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* SALIR */}
          <li className="rounded-md bg-zinc-600 px-4 py-2 w-full text-center hover:bg-zinc-500">
            <Link className="w-full h-[2rem]" to="/logout">
              Salir
            </Link>
          </li>
        </ul>
      )}

      {!isAuthenticate && (
        <ul className="flex flex-col md:flex-row gap-x-2">
          <li className="font-bold rounded-md bg-zinc-600 px-2 py-2 hover:bg-zinc-500">
            <Link to="/login">Login</Link>
          </li>
          <li className="font-bold rounded-md bg-zinc-600 px-2 py-2 hover:bg-zinc-500">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default NavbarOne
