import mongoose from "mongoose";

const listaPrecioSchema = new mongoose.Schema(
  {
    descripcion: {
      type: String,
    },
    incluyeImpuesto: {
      type: Boolean,
    },
    fechaVigencia: {
      type: Date,
      required: true,
    },
    fechaExpiracion: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ListaPrecio", listaPrecioSchema);
