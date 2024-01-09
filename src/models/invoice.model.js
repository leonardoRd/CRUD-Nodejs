import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    tipoComprobante: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    estado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estado",
      required: true,
    },
    fechaEmision: {
      type: Date,
    },
    importe: {
      type: Number,
    },
    tasaDeCambio: {
      type: Number,
    },
    persona: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    condicionPago: {
      type: String,
      required: true,
    },
    instrumento: {
      type: String,
    },
    listaPrecio: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invoice", invoiceSchema);
