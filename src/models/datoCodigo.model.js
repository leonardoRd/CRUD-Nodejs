import mongoose from "mongoose";

const datoCodigoSchema = new mongoose.Schema(
  {
    datoComun: {
      type: String,
      required: true,
    },
    datoCodigo: {
      type: String,
      required: true,
    },
    valorTexto: {
      type: String,
    },
    valorNumerico: {
      type: Number,
    },
    valorBoolean: {
      type: Boolean,
    },
    descripcion: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DatoCodigo", datoCodigoSchema);
