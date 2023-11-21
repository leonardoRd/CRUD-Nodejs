import Invoice from "../models/invoice.model.js";

export const getInvoices = async (req, res) => {        
    const invoices = await Invoice.find();
    /* const invoices = await Invoice.find({
        persona: req.user.id
    }).populate('user'); // Trae todos los task del user logueado */
    res.json(invoices);
}

export const getInvoice = async (req, res) => {
    const invoice = await Invoice.findById(req.params.id)
    //.populate('user'); // populate para traer los datos del usuario tmb
    if(!invoice) return res.status(404).json({ message: "Invoice not found"});

    res.json(invoice);
}

export const createInvoice = async (req, res) => {
    const {tipoComprobante, descripcion, estado, fechaEmision, importe,tasaDeCambio} = req.body;

    const newInvoice = new Invoice({
        tipoComprobante,
        descripcion,
        estado,
        fechaEmision,
        importe,
        tasaDeCambio,
        //persona: req.user.id
    });

    const invoiceSaved = await newInvoice.save();
    res.json(invoiceSaved);
}

export const deleteInvoice = async (req, res) => {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if(!invoice) return res.status(404).json({ message: "Invoice not found"});

    res.json(invoice);
}

export const uploadInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
    
        if(!invoice) return res.status(404).json({message: "invoice not found"});
    
        res.json(invoice);    
    } catch (error) {
        return res.status(400).json(["Not found"]);
    }
    
}
