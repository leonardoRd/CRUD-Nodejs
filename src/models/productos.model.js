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
      
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Producto", productosSchema);
