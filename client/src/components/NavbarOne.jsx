import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import { IoMdExit } from 'react-icons/io'
import { IoAddCircleSharp } from 'react-icons/io5'
import { SiWelcometothejungle } from 'react-icons/si'

function NavbarOne() {
  const { isAuthenticate, user } = useAuth()
  const [showProducts, setShowProducts] = useState(false)
  const [showTipoComp, setShowTipoComp] = useState(false)
  const [showFacturas, setShowFacturas] = useState(false)
  const [showDatoCodigo, setShowDatoCodigo] = useState(false)

  const setOptionFacturas = () => {
    setShowFacturas(!showFacturas)
  }

  const setOptionTipoCompr = () => {
    setShowTipoComp(!showTipoComp)
  }

  const setOptionProducts = () => {
    setShowProducts(!showProducts)
  }

  const setOptionConfiguracion = () => {
    setShowDatoCodigo(!showDatoCodigo)
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
          <div className="inline-flex justify-between justify-items-center">
            <li className="font-bold px-4 py-2 w-full h-full">
              Bienvenido {user.username}
            </li>
          </div>

          {/* Agregar Tareas */}
          <li className="rounded-md bg-zinc-600 px-4 py-2 w-full h-full text-center hover:bg-zinc-500">
            <div className="inline-flex items-center justify-between">
              <IoAddCircleSharp className="w-10 h-10" />
              <Link
                to="/add-task"
                className="ml-4 w-auto h-[2rem] flex items-center"
              >
                Agregar Tareas
              </Link>
            </div>
          </li>

          {/* Agregar Facturas */}
          <li
            className={`relative block md:inline-block rounded-md bg-zinc-600 px-3 py-2 w-full h-full text-center hover:bg-zinc-500`}
          >
            <div
              onClick={setOptionFacturas}
              className="w-full h-full inline-flex items-center justify-center cursor-pointer"
            >
              <SlArrowDown className="w-5 h-5 mt-2 mr-2 p-0" />
              <button className="ml-2">Facturas</button>
            </div>

            {/* Menu desplegable de Facturas */}
            {showFacturas && (
              <ul className="absolute left-0 mt-2 items-center w-48">
                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-full h-auto">
                  <Link
                    onClick={setOptionFacturas}
                    to="/invoices"
                    className="w-full h-[2rem] block"
                  >
                    Ver Facturas
                  </Link>
                </li>

                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-full h-auto">
                  <Link
                    onClick={setOptionFacturas}
                    to="/add-invoice"
                    className="w-full h-[2rem] block"
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
              <ul className="absolute left-0 mt-2 w-60 text-left">
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

          {/* INVENTARIO */}
          <li
            className={`relative block md:inline-block rounded-md bg-zinc-600 px-3 py-2 w-full h-full text-center hover:bg-zinc-500`}
          >
            <div
              onClick={setOptionProducts}
              className="w-full h-full flex items-center justify-between"
            >
              <SlArrowDown className="w-5 h-5" />
              <button className="ml-2 w-auto h-auto">Inventario</button>
            </div>

            {/* Menu desplegable de Inventario */}
            {showProducts && (
              <ul className="absolute left-0 mt-2">
                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-auto h-auto">
                  <Link
                    onClick={setOptionProducts}
                    to="/inventario"
                    className="w-full h-[2rem] block"
                  >
                    Ver Inventario
                  </Link>
                </li>
                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-auto h-auto">
                  <Link
                    onClick={setOptionProducts}
                    to="/productos"
                    className="w-full h-[2rem] block"
                  >
                    Ver Productos
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* AGREGAR CONFIGURACIONES */}
          <li
            className={`relative block md:inline-block rounded-md bg-zinc-600 px-3 py-2 w-full h-full text-center hover:bg-zinc-500`}
          >
            <div
              onClick={setOptionConfiguracion}
              className="w-full h-full inline-flex items-center justify-center cursor-pointer"
            >
              <SlArrowDown className="w-5 h-5 mt-2 mr-2 p-0" />
              <button className="ml-2">Configuración</button>
            </div>

            {/* Menu desplegable de Configuración */}
            {showDatoCodigo && (
              <ul className="absolute left-0 mt-2 items-center w-48">
                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-full h-auto">
                  <Link
                    onClick={setOptionConfiguracion}
                    to="/datoCodigo"
                    className="w-full h-[2rem] block"
                  >
                    Ver Dato Código
                  </Link>
                </li>

                <li className="block px-4 bg-zinc-600 py-2 hover:bg-zinc-500 w-full h-auto">
                  <Link
                    onClick={setOptionConfiguracion}
                    to="/add-datoCodigo"
                    className="w-full h-[2rem] block"
                  >
                    Agregar Dato Código
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* SALIR */}
          <li className="rounded-md bg-zinc-600 px-4 py-2 w-25 text-center hover:bg-zinc-500">
            <div className="flex items-center justify-between">
              <Link to="/logout" className="w-full h-[2rem] block">
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
