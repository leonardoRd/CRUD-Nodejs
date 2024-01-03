import { Router } from "express";
import { authToken } from "../middlewares/validateToken.js";
import {
  getDatoCodigo,
  getDatoCodigos,
  createDatoCodigo,
  deleteDatoCodigo,
  uploadDatoCodigo,
  getDatoCodigoDesc,
} from "../controllers/datoCodigo.controller.js";

const router = Router();

// Rutas de dato codigos
router.get("/datoCodigos", authToken, getDatoCodigos);

router.get("/datoCodigo", authToken, getDatoCodigo);

router.get("/datosCodigosDesc", authToken, getDatoCodigoDesc);

router.post("/datoCodigo", authToken, createDatoCodigo);

router.delete("/datoCodigo", authToken, deleteDatoCodigo);

router.put("/datoCodigo", authToken, uploadDatoCodigo);

export default router;
