import { Router } from "express";
import { authToken } from "../middlewares/validateToken.js";
import {
  getProductos,
  getProducto,
  createProducto,
  deleteProducto,
  uploadProducto,
} from "../controllers/productos.controller.js";

const router = Router();

// Funciones de Productos
router.get("/productos", authToken, getProductos);

router.get("/producto/:id", authToken, getProducto);

router.post("/producto", authToken, createProducto);

router.delete("/producto/:id", authToken, deleteProducto);

router.put("/producto/:id", authToken, uploadProducto);

export default router;
