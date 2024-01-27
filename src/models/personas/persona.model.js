import mongoose from "mongoose";

const personaSchema = new mongoose.Schema(
  {
    razonSocial: {
      type: String,
      required: true,
    },
    numeroDocumento: {
      type: String,
      required: true,
    },
    codigoFiscal: {
      type: String,
      required: true,
    },
    edad: {
      type: Number,
    },
    pais: {
      type: String,
    },
    ciudad: {
      type: String,
    },
    codigoPostal: {
      type: String,
    },
    email: {
      type: String,
    },
    cliente: {
      type: Boolean,
    },
    proveedor: {
      type: Boolean,
    },
    telefono: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Persona", personaSchema);
