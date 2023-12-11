import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import { IoMdExit } from 'react-icons/io'
import { IoAddCircleSharp } from 'react-icons/io5'
import { SiWelcometothejungle } from 'react-icons/si'

function NavbarOne() {
  const { isAuthenticate, user } = useAuth()
  const [showOptions, setShowOptions] = useState(false)
  const [showProducts, setShowProducts] = useState(false)
  const [showTipoComp, setShowTipoComp] = useState(false)
  const [showFacturas, setShowFacturas] = useState(false)
  const [showOptionsTipo, setShowOptionsTipo] = useState(false)

  const setOptionFacturas = () => {
    setShowFacturas(!showFacturas)
  }

  const setOptionTipoCompr = () => {
    setShowTipoComp(!showTipoComp)
  }

  const setOptionProducts = () => {
    setShowProducts(!showProducts)
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
          <div className='inline-flex justify-between justify-items-center'>
            
            <li className="font-bold px-4 py-2 w-full h-full">
              Bienvenido {user.username}
            </li>
          </div>

          {/* Agregar Tareas */}
          <li className="rounded-md bg-zinc-600 px-4 py-2 w-full h-full text-center hover:bg-zinc-500">
            <div className="inline-flex justify-between justify-items-center">
              <IoAddCircleSharp className="w-10 h-10" />
              <Link className="w-auto h-[2rem]" to="/add-task">
                Agregar Tareas
              </Link>
            </div>
          </li>

          {/* Agregar Facturas */}
          <li
            className={`relative block md:inline-block rounded-md bg-zinc-600 px-3 py-2 w-full h-full text-center hover:bg-zinc-500 
            }`}
          >
            <div
              onClick={setOptionFacturas}
              className="w-full h-full inline-flex justify-items-center text-center"
            >
              <SlArrowDown className="w-5 h-5 mt-2 mr-2 p-0" />
              <button className="ml-2 text-center">Facturas</button>
            </div>

            {/* Menu desplegable de Facturas */}
            {showFacturas && (
              <ul className="absolute left-0 mt-2 items-center w-100">
                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-auto h-auto">
                  <Link
                    onClick={setOptionFacturas}
                    className="w-full h-[2rem]"
                    to="/invoices"
                  >
                    Ver Facturas
                  </Link>
                </li>

                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-auto h-auto">
                  <Link
                    onClick={setOptionFacturas}
                    className="w-full h-[2rem]"
                    to="/add-invoice"
                  >
                    Agregar Facturas
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Agregar Tipos de Comprobantes */}
          <li
            className={`relative block md:inline-block rounded-md text-center w-full h-auto bg-zinc-600 px-3 py-2 hover:bg-zinc-500
            }`}
          >
            <div
              onClick={setOptionTipoCompr}
              className="w-full h-full inline-flex justify-between justify-items-center"
            >
              <SlArrowDown className="w-10 h-5" />
              <button>Tipos de Comprobantes</button>
            </div>

            {/* Menu desplegable de Tipos de Comprobantes */}
            {showTipoComp && (
              <ul className="absolute left-0 mt-2">
                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-auto">
                  <Link
                    onClick={setOptionTipoCompr}
                    className="w-full h-[2rem]"
                    to="/tiposComprob"
                  >
                    Tipos de Comprobantes
                  </Link>
                </li>
                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-auto">
                  <Link
                    onClick={setOptionTipoCompr}
                    className="w-full h-[2rem]"
                    to="/add-tipoComprob"
                  >
                    Agregar Tipos de Comprobantes
                  </Link>
                </li>
                <li className="block px-4 bg-zinc-600 py-2 w-full hover:bg-zinc-500">
                  <Link
                    onClick={setOptionTipoCompr}
                    className="w-full h-[2rem]"
                    to="/estados"
                  >
                    Estados de Comprobantes
                  </Link>
                </li>
                <li className="block px-4  bg-zinc-600 py-2 w-full hover:bg-zinc-500">
                  <Link
                    onClick={setOptionTipoCompr}
                    className="w-full h-[2rem]"
                    to="/add-estado"
                  >
                    Agregar Estados Comprobantes
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Agregar Productos */}
          <li
            className={`relative block md:inline-block rounded-md bg-zinc-600 px-3 py-2 w-full h-full text-center hover:bg-zinc-500}`}
          >
            <div
              onClick={setOptionProducts}
              className="w-full h-full inline-flex justify-between justify-items-center"
            >
              <SlArrowDown className="mt-2 w-10 h-5" />
              <button>Productos</button>
            </div>

            {/* Menu desplegable de Productos */}
            {showProducts && (
              <ul className="absolute left-0 mt-2 items-center w-auto">
                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-auto h-auto">
                  <Link
                    onClick={setOptionProducts}
                    className="w-full h-[2rem]"
                    to="/productos"
                  >
                    Ver Productos
                  </Link>
                </li>
                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-auto h-auto">
                  <Link
                    onClick={setOptionProducts}
                    className="w-full h-[2rem]"
                    to="/add-productos"
                  >
                    Agregar Productos
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* SALIR */}
          <li className="rounded-md bg-zinc-600 px-4 py-2 w-full text-center hover:bg-zinc-500">
            <div className="flex justify-between align-bottom">
              <Link className="w-full h-[2rem]" to="/logout">
                Salir
              </Link>
              <IoMdExit className="w-10 h-10" />
            </div>
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
