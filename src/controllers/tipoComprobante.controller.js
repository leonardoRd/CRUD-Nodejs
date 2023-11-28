import TipoComprobante from "../models/tipoComprobante.model.js";

export const getTiposComprobantes = async (req, res) => {        
    try {
        const tipoComprobante = await TipoComprobante.find()
        console.log(tipoComprobante)
        res.json(tipoComprobante);        
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Error al obtener Tipos de Comprobantes' });
    }
}

export const getTipoComprobante = async (req, res) => {
    const tipoComprobante = await TipoComprobante.findById(req.params.id)
    if(!tipoComprobante) return res.status(404).json({ message: "Tipo Comprobante not found"});

    res.json(tipoComprobante);
}

export const createTipoComprobante = async (req, res) => {
    const {tipoComprobanteID, descripcion} = req.body;

    const newTipoComprob = new TipoComprobante({
        tipoComprobanteID,
        descripcion
    });

    const tipoComprobSaved = await newTipoComprob.save();
    res.json(tipoComprobSaved);
}

export const deleteTipoComprobante = async (req, res) => {
    const tipoComprob = await TipoComprobante.findByIdAndDelete(req.params.id);

    if(!tipoComprob) return res.status(404).json({ message: "Tipo de Comprobante not found"});

    res.json(tipoComprob);
}

export const uploadTipoComprobante = async (req, res) => {
    try {
        const tipoComprob = await TipoComprobante.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
    
        if(!tipoComprob) return res.status(404).json({message: "Tipo de Comprobante not found"});
        res.json(tipoComprob);    
    } catch (error) {
        return res.status(400).json(["Not found"]);
    }
    
}
