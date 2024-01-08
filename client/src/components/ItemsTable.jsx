function ItemsTable(props) {
  const { filas, handleDelete } = props
  
  return (
    <table
      border="1"
      className="min-w-full table-auto justify-center text-center max-w-full"
    >
      <thead>
        <tr>
          <th className="text-white px-4 border-x-2 border-cyan-400">ID</th>
          <th className="text-white px-4 border-x-2 border-cyan-400">
            Producto
          </th>
          <th className="text-white px-4 border-x-2 border-cyan-400">
            Cantidad
          </th>
          <th className="text-white px-4 border-x-2 border-cyan-400">
            Precio Unitario
          </th>
          <th className="text-white px-4 border-x-2 border-cyan-400">
            Importe
          </th>
          <th className="text-white px-4 border-x-2 border-cyan-400">Acción</th>
        </tr>
      </thead>
      <tbody>
        {filas.map((fila) => (
          <tr key={fila.id}>
            <td>{fila.id}</td>
            <td>{fila.descripcion}</td>
            <td>{fila.cantidad}</td>
            <td>${fila.precioUnitario}</td>
            <td>${fila.importe}</td>
            <td>
              <button
                className="w-auto bg-red-700 text-white rounded-lg p-2 hover:bg-red-500"
                onClick={(e) => {
                  e.preventDefault()
                  handleDelete(fila.id)
                }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ItemsTable
