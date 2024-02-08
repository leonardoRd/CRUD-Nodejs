import Invoice from "../models/invoice.model.js";
import User from "../models/user.model.js";
import InvoiceItem from "../models/invoiceItem.model.js";

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

// Obtener detalle de la factura dado el ID
export const getInvoiceItem = async (req, res) => {
  try {
    const invoicesItems = await InvoiceItem.find({
      invoiceId: req.params.id,
    }).populate("productoId");

    if (!invoicesItems)
      return res
        .status(500)
        .json({ Mensaje: "No se encontró detalle para al factura" });

    res.json(invoicesItems);
  } catch (error) {
    res.status(500).json({ Mensaje: "Error en el servidor" });
  }
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
    condicionPago,
    instrumento,
    listaPrecio,
    data,
  } = req.body;

  const fechaEmisionCasteada = new Date(fechaEmision);

  try {
    const newInvoice = new Invoice({
      tipoComprobante,
      descripcion,
      estado,
      fechaEmision: fechaEmisionCasteada,
      importe,
      tasaDeCambio,
      persona: req.user.id,
      cliente,
      condicionPago,
      instrumento,
      listaPrecio,
    });

    const invoiceSaved = await newInvoice.save();

    // Detalle de factura
    for (const item of data) {
      const newDetalleItem = new InvoiceItem({
        invoiceId: invoiceSaved._id,
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        importe: item.importe,
      });

      await newDetalleItem.save();
    }

    res.json(invoiceSaved);
  } catch (error) {
    res.status(500).json({ mesaje: "No se pudo crear la factura" });
  }
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
