import {Router} from 'express'
import { authToken } from '../middlewares/validateToken.js';
import {getInvoices, getInvoice, createInvoice, deleteInvoice, uploadInvoice} from '../controllers/invoice.controller.js'
//import {validateSchema} from '../middlewares/validateMiddleware.js'
//import {CreateTaskSchema} from '../schemas/task.schema.js'

const router = Router();

router.get('/invoices',authToken, getInvoices);

router.get('/invoice/:id',authToken, getInvoice);

router.post('/invoice', authToken, createInvoice);

router.delete('/invoice/:id',authToken, deleteInvoice);

router.put('/invoice/:id',authToken, uploadInvoice);

export default router;