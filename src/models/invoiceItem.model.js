import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    precioUnitario: {
      type: Number,
    },
    importe: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("InvoiceItem", invoiceItemSchema);
