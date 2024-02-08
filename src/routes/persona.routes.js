import { Router } from "express";
import { authToken } from "../middlewares/validateToken.js";
import {
  getPersonas,
  getPersona,
  createPersona,
  updatePersona,
  deletePersona,
} from "../controllers/persona.controller.js";

const router = Router();

router.get("/personas",  getPersonas);

router.get("/personas/:id", getPersona);

router.post("/personas", createPersona);

router.put("/personas/:id", updatePersona);

router.delete("/personas/:id", deletePersona);

export default router;
