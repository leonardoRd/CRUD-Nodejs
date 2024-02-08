import { Router } from "express";
import { authToken } from "../middlewares/validateToken.js";
import {
  getInvoices,
  getInvoice,
  createInvoice,
  deleteInvoice,
  uploadInvoice,
  getUsers,
  getUser,
  getInvoiceItem,
} from "../controllers/invoice.controller.js";
import {
  getTiposComprobantes,
  getTipoComprobante,
  createTipoComprobante,
  deleteTipoComprobante,
  uploadTipoComprobante,
} from "../controllers/tipoComprobante.controller.js";

import {
  getEstado,
  getEstados,
  createEstado,
  deleteEstado,
  uploadEstado,
} from "../controllers/estados.controller.js";

const router = Router();

// Funciones de Facturas
router.get("/invoices", authToken, getInvoices);

router.get("/invoice/:id", authToken, getInvoice);

router.get("/invoiceItem/:id", authToken, getInvoiceItem);

router.post("/invoice", authToken, createInvoice);

router.delete("/invoice/:id", authToken, deleteInvoice);

router.put("/invoice/:id", authToken, uploadInvoice);

// Funciones de usuario
router.get("/users", authToken, getUsers);

router.get("/user/:id", authToken, getUser);

// Funciones de Tipos de Comprobantes
router.get("/tiposComprobantes", authToken, getTiposComprobantes);

router.get("/tipoComprobante/:id", authToken, getTipoComprobante);

router.post("/tipoComprobante", authToken, createTipoComprobante);

router.delete("/tipoComprobante/:id", authToken, deleteTipoComprobante);

router.put("/tipoComprobante/:id", authToken, uploadTipoComprobante);

// Funciones de Estado de Comprobantes
router.get("/estados", authToken, getEstados);

router.get("/estado/:id", authToken, getEstado);

router.post("/estado", authToken, createEstado);

router.delete("/estado/:id", authToken, deleteEstado);

router.put("/estado/:id", authToken, uploadEstado);

export default router;
