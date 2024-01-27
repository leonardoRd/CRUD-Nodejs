import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="flex flex-col min-h-screen mx-auto items-center">
      <footer className="px-20 py-5 mb-3 bg-zinc-700 fixed bottom-0 w-full ">
        <ul className="flex justify-between font-semibold text-white">
          <li>
            <Link to="">Sobre Nosotros</Link>
          </li>
          <li>
            <Link to="">Contacto</Link>
          </li>
          <li>
            <Link to="">Ayuda</Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer
