import Inventario from "../models/inventario/inventario.model.js";

export const getInventario = async (req, res) => {
  try {
    const inventario = await Inventario.find().populate("productoID");
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ mensaje: "No se encontraron datos en Inventario" });
  }
};

export const getInventarioById = async (req, res) => {
  const producto = req.params.id;
  console.log(producto);
  try {
    const productFound = await Inventario.findOne({ _id: producto }).populate(
      "productoID"
    );

    if (!productFound)
      return res
        .status(500)
        .json({ mensaje: "No existe el Producto en el Inventario" });

    res.json(productFound);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al recibir el parámetro del producto a buscar" });
  }
};

export const getInventarioItem = async (req, res) => {
  const item = req.params.id;
  try {
    const producctoEncontrado = await Inventario.find({
      productoID: item,
    }).populate("productoID");

    if (!producctoEncontrado)
      return res.status(500).json({ Mensaje: "No se encontró el producto" });

    res.json(producctoEncontrado);
  } catch (error) {
    res.status(500).json({ Mensaje: "Error en el Servidor" });
  }
};

export const agregarItemInventario = async (req, res) => {
  const { producto, cantidad } = req.body;
  try {
    const newInventario = new Inventario({
      productoID: producto,
      cantidad: cantidad,
    });

    const inventarioSaved = await newInventario.save();
    res.json(inventarioSaved);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al recibir los datos" });
  }
};

export const updateInventario = async (req, res) => {
  try {
    const productoActualizado = await Inventario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!productoActualizado)
      return res
        .status(500)
        .json({ mensaje: "No se pudo actualizar el item en el Inventario" });

    res.json(productoActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al recibir los parámetro al actualizar" });
  }
};

export const deleteItemInventario = async (req, res) => {
  try {
    const productoEliminado = await Inventario.findByIdAndDelete(req.params.id);

    if (!productoEliminado)
      return res
        .status(500)
        .json({ mensaje: "El prodcuto no se encuentra en el Inventario" });

    res.json(productoEliminado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al recibir los parámetros" });
  }
};
