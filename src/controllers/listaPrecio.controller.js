import ListaPrecio from "../models/lista_precio/listaPrecio.model.js";
import ListaPrecioItem from "../models/lista_precio/listaPrecioItem.model.js";

export const getListasPrecios = async (req, res) => {
  try {
    const listasPrecios = await ListaPrecio.find();
    res.json(listasPrecios);
  } catch (error) {
    res.status(500).json({ Mensaje: "Error al obtener las listas de precio" });
  }
};

export const getListaPrecio = async (req, res) => {
  try {
    const listaPrecio = await ListaPrecio.findById(req.params.id);

    if (!listaPrecio)
      return res
        .status(500)
        .json({ Mensaje: "No se encontró la Lista de Precio" });

    res.json(listaPrecio);
  } catch (error) {
    res.status(500).json({ Mensaje: "Error en el servidor" });
  }
};

export const createListaPrecio = async (req, res) => {
  const { descripcion, fechaVigencia, fechaExpiracion } = req.body; // Datos Cabecera
  const { data } = req.body; // Datos para ListaPrecioItem

  try {
    // Creacion de la Lista de Precio
    const newListaPrecio = new ListaPrecio({
      descripcion,
      fechaVigencia,
      fechaExpiracion,
    });
    const listaPrecioSaved = await newListaPrecio.save();
    if (!listaPrecioSaved)
      return res
        .status(500)
        .json({ Mensaje: "Error al crear la Lista de Precio" });

    // Creacion de la Lista de Precio Item
    data.forEach(async (item) => {
      const newItem = new ListaPrecioItem({
        productoId: item.productoId,
        listaPrecioId: listaPrecioSaved._id,
        importe: item.importe,
        impuesto: item.impuesto,
      });

      const itemSaved = await newItem.save();
      if (!itemSaved)
        return res
          .status(500)
          .json({ Mensaje: `${item.productoId} No se pudo crear` });
    });

    res.json(listaPrecioSaved);
  } catch (error) {
    res.status(500).json({ Mensaje: "Error al obtener los parámetros" });
  }
};

// Para actualizar pasar el id de la ListaPrecioItem, en caso de no pasarlo, lo agrega como nuevo
export const updateListaPrecio = async (req, res) => {
  const cabecera = {};
  const { descripcion, fechaVigencia, fechaExpiracion } = req.body;
  const { data } = req.body;
  cabecera.descripcion = descripcion;
  cabecera.fechaVigencia = fechaVigencia;
  cabecera.fechaExpiracion = fechaExpiracion;

  try {
    const listaPrecioActualizada = await ListaPrecio.findByIdAndUpdate(
      req.params.id,
      cabecera,
      { new: true }
    );

    data.forEach(async (item) => {
      const itemsActualizado = await ListaPrecioItem.findByIdAndUpdate(
        item.id,
        item,
        { new: true }
      );

      // Si no lo encuentra lo agrega como nuevo
      if (!itemsActualizado) {
        const newItem = new ListaPrecioItem({
          productoId: item.productoId,
          listaPrecioId: listaPrecioActualizada._id,
          importe: item.importe,
          impuesto: item.impuesto,
        });
        const itemSaved = await newItem.save();
      }
    });

    res.json(listaPrecioActualizada);
  } catch (error) {
    res.status(500).json({ Mensaje: "Error en el servidor" });
  }
};

export const deleteListaPrecio = async (req, res) => {
  try {
    const listaBorrada = await ListaPrecio.findByIdAndDelete(req.params.id);
    if (!listaBorrada)
      return res
        .status(500)
        .json({ Mensaje: "No se encontró la Lista a borrar" });

    const listaItemsBorrada = await ListaPrecioItem.deleteMany({
      listaPrecioId: req.params.id,
    });

    if (!listaItemsBorrada)
      return res.status(500).json({ Mensaje: "No se encontró items" });

    res.status(200).json({ Mensaje: "Borrado correctamente" });
  } catch (error) {
    res.status(500).json({ Mensaje: "Error en el Servidor" });
  }
};