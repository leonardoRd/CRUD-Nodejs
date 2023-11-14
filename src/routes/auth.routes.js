import { Router } from "express";
import {login, register, logout, profile, verify} from '../controllers/auth.controller.js'
import { authToken } from '../middlewares/validateToken.js'
import {registeSchema, loginSchema} from '../schemas/auth.schema.js'
import {validateSchema} from '../middlewares/validateMiddleware.js'

const router = Router();

router.post('/register', validateSchema(registeSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/verifyToken', verify);

router.get('/profile', authToken, profile);

export default router;