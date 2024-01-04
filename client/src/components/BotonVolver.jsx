function BotonVolver({ onClick }) {
  return (
    <button
      className="w-auto bg-red-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-red-500"
      onClick={onClick}
    >
      Volver
    </button>
  )
}

export default BotonVolver
