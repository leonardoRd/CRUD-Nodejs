import Estado from "../models/estado.model.js";

export const getEstados = async (req, res) => {        
    try {
        const estado = await Estado.find()    
        res.json(estado);        
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Error al obtener Estados' });
    }
}

export const getEstado = async (req, res) => {
    const estado = await Estado.findById(req.params.id)
    if(!estado) return res.status(404).json({ message: "Estado not found"});

    res.json(estado);
}

export const createEstado = async (req, res) => {
    const {estadoID, descripcion} = req.body;
    const newEstado = new Estado({
        estadoID,
        descripcion
    });

    const estadoSaved = await newEstado.save();
    res.json(estadoSaved);
}

export const deleteEstado = async (req, res) => {
    const estado = await Estado.findByIdAndDelete(req.params.id);

    if(!estado) return res.status(404).json({ message: "Estado not found"});

    res.json(estado);
}

export const uploadEstado = async (req, res) => {
    try {
        const estado = await Estado.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
    
        if(!estado) return res.status(404).json({message: "Estado not found"});
        res.json(estado);    
    } catch (error) {
        return res.status(400).json(["Not found"]);
    }
    
}
