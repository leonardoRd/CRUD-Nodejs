import Producto from "../models/productos.model.js";
import Inventario from "../models/inventario/inventario.model.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
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
  const { descripcion, unidadMedida, deposito, tipo, usuario, cantidad } =
    req.body;

  try {
    const newProducto = new Producto({
      descripcion,
      unidadMedida,
      deposito,
      tipo,
    });

    const productoGuardado = await newProducto.save();

    // Guardamos la cantidad en Inventario
    const newInventario = new Inventario({
      productoID: productoGuardado._id,
      cantidad: cantidad,
    });
    const inventarioSaved = await newInventario.save();

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
    const { descripcion, unidadMedida, deposito, tipo } = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      {
        descripcion,
        unidadMedida,
        deposito,
        tipo,
      },
      { new: true }
    );

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ Mensaje: "No se pudo actualizar el producto" });
  }
};
