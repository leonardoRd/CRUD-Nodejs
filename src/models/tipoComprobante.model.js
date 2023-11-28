import mongoose from "mongoose";

const tipoComprobanteSchema =  new mongoose.Schema({
    tipoComprobanteID: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('TipoComprobante', tipoComprobanteSchema);