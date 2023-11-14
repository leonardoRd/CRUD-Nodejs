import {Router} from 'express'
import { authToken } from '../middlewares/validateToken.js';
import {getTask, getTasks, createTask, deleteTasks, uploadTask} from '../controllers/tasks.controllers.js'
import {validateSchema} from '../middlewares/validateMiddleware.js'
import {CreateTaskSchema} from '../schemas/task.schema.js'


const router = Router();

router.get('/task', authToken, getTasks);

router.get('/task/:id', authToken, getTask);

router.post('/task', authToken, validateSchema(CreateTaskSchema) , createTask);

router.delete('/task/:id', authToken, deleteTasks);

router.put('/task/:id', authToken, uploadTask);

export default router;