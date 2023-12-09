import Producto from "../models/productos.model.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ usuario: req.user.id });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Productos no encontrados" });
  }
};

export const getProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Producto no encontrado" });
  }
};

export const createProducto = async (req, res) => {
  const { descripcio, unidadMedida, deposito, tipo, usuario } = req.body;

  try {
    const newProducto = new Producto(
      descripcio,
      unidadMedida,
      deposito,
      tipo,
      usuario
    );

    const productoGuardado = await newProducto.save();
    res.json(productoGuardado);
  } catch (error) {
    res.status(500).json({ Mensaje: "No se pudo crear el producto" });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const productoBorrado = await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json(productoBorrado);
  } catch (error) {
    res.status(500).json({ Mensaje: "No se pudo eliminar el producto" });
  }
};

export const uploadProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ Mensaje: "No se pudo actualizar el producto" });
  }
};
