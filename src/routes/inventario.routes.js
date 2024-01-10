import { Router } from "express";
import { authToken } from "../middlewares/validateToken.js";
import {
  getInventario,
  getInventarioById,
  agregarItemInventario,
  updateInventario,
  deleteItemInventario,
  getInventarioItem,
  verificarInventario,
} from "../controllers/inventario.controller.js";

const router = Router();

// Funciones de Inventario
router.get("/inventario", authToken, getInventario);

router.get("/inventario/:id", authToken, getInventarioById);

router.get("/inventarioItem/:id", authToken, getInventarioItem);

router.post("/inventario", authToken, agregarItemInventario);

router.post("/verificarInventario", authToken, verificarInventario);

router.delete("/inventario/:id", authToken, deleteItemInventario);

router.put("/inventario/:id", authToken, updateInventario);

export default router;
