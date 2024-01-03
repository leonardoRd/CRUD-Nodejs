import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema(
  {
    productoID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Inventario", inventarioSchema);
