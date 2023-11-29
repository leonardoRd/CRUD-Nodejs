import mongoose from "mongoose";

const estadoSchema =  new mongoose.Schema({
    estadoID: {
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

export default mongoose.model('Estado', estadoSchema);