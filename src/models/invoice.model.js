import mongoose from "mongoose";

const invoiceSchema =  new mongoose.Schema({
    tipoComprobante: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    fechaEmision: {
        type: Date
    },
    importe: {
        type: Number        
    },
    tasaDeCambio: {
        type: Number,
    },
    persona: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Invoice', invoiceSchema);