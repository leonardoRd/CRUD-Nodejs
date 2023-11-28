import {Router} from 'express'
import { authToken } from '../middlewares/validateToken.js';
import {getInvoices, getInvoice, createInvoice, deleteInvoice, uploadInvoice, getUsers, getUser} from '../controllers/invoice.controller.js'
import {getTiposComprobantes, getTipoComprobante, createTipoComprobante, deleteTipoComprobante, uploadTipoComprobante} from '../controllers/tipoComprobante.controller.js'

const router = Router();

// Funciones de Facturas
router.get('/invoices',authToken, getInvoices);

router.get('/invoice/:id',authToken, getInvoice);

router.post('/invoice', authToken, createInvoice);

router.delete('/invoice/:id',authToken, deleteInvoice);

router.put('/invoice/:id',authToken, uploadInvoice);

// Funciones de usuario
router.get('/users',authToken, getUsers);

router.get('/user/:id',authToken, getUser);

// Funciones de Tipos de Comprobantes
router.get('/tiposComprobantes',authToken, getTiposComprobantes);

router.get('/tipoComprobante/:id',authToken, getTipoComprobante);

router.post('/tipoComprobante', authToken, createTipoComprobante);

router.delete('/tipoComprobante/:id',authToken, deleteTipoComprobante);

router.put('/tipoComprobante/:id',authToken, uploadTipoComprobante);

export default router;