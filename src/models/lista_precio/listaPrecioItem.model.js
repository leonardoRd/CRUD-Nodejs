import mongoose from "mongoose";

const listaPrecioItemSchema = new mongoose.Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  listaPrecioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ListaPrecio",
    required: true,
  },
  importe: {
    type: Number,
    required: true,
  },
  impuesto: {
    type: Number,
  },
});

export default mongoose.model("ListaPrecioItem", listaPrecioItemSchema);
