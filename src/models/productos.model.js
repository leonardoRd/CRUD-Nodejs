import mongoose from "mongoose";

const productosSchema = new mongoose.Schema(
  {
    descripcion: {
      type: String,
      required: true,
    },
    unidadMedida: {
      type: String,
      required: true,
    },
    deposito: {
      type: String,
    },
    tipo: {
      type: String,
      required: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Producto", productosSchema);
