import {Router} from 'express'
import { authToken } from '../middlewares/validateToken.js';
import {getInvoices, getInvoice, createInvoice, deleteInvoice, uploadInvoice, getUsers, getUser} from '../controllers/invoice.controller.js'

const router = Router();

router.get('/invoices',authToken, getInvoices);

router.get('/invoice/:id',authToken, getInvoice);

router.post('/invoice', authToken, createInvoice);

router.delete('/invoice/:id',authToken, deleteInvoice);

router.put('/invoice/:id',authToken, uploadInvoice);

router.get('/users',authToken, getUsers);

router.get('/user/:id',authToken, getUser);

export default router;