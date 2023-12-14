import Invoice from "../models/invoice.model.js";
import User from "../models/user.model.js";

export const getInvoices = async (req, res) => {
  try {
    const { tipoComprobante, cliente } = req.query;

    let query = { persona: req.user.id };

    if (tipoComprobante) {
      // Si se proporciona el tipo de comprobante, agregarlo a la consulta
      query.tipoComprobante = tipoComprobante;
    }

    if (cliente) query.cliente = cliente;

    const invoices = await Invoice.find(query)
      .populate({
        path: "estado",
        model: "Estado",
      })
      .populate({
        path: "persona",
        model: "User",
        match: { _id: { $exists: true } },
      })
      .populate({
        path: "cliente",
        model: "User",
        match: { _id: { $exists: true } },
      });

    res.json(invoices);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error al obtener facturas con populate cliente" });
  }
};

export const getInvoice = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
    .populate("persona")
    .populate("cliente");
  if (!invoice) return res.status(404).json({ message: "Invoice not found" });

  res.json(invoice);
};

export const createInvoice = async (req, res) => {
  const {
    tipoComprobante,
    descripcion,
    estado,
    fechaEmision,
    importe,
    tasaDeCambio,
    cliente,
  } = req.body;

  const newInvoice = new Invoice({
    tipoComprobante,
    descripcion,
    estado,
    fechaEmision: new Date(fechaEmision).toLocaleDateString(),
    importe,
    tasaDeCambio,
    persona: req.user.id,
    cliente,
  });

  const invoiceSaved = await newInvoice.save();
  res.json(invoiceSaved);
};

export const deleteInvoice = async (req, res) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);

  if (!invoice) return res.status(404).json({ message: "Invoice not found" });

  res.json(invoice);
};

export const uploadInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!invoice) return res.status(404).json({ message: "invoice not found" });
    res.json(invoice);
  } catch (error) {
    return res.status(400).json(["Not found"]);
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).json({ message: "users not found" });

  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "user not found" });
  res.json(user);
};
