import { Router } from "express";
import { authToken } from "../middlewares/validateToken.js";
import {
  getListaPrecio,
  getListasPrecios,
  createListaPrecio,
  updateListaPrecio,
  deleteListaPrecio,
  getListaPrecioItem,
  deleteListaPrecioItems,
} from "../controllers/listaPrecio.controller.js";

const router = Router();

// Funciones de Inventario
router.get("/listaPrecio", authToken, getListasPrecios);

router.get("/listaPrecio/:id", authToken, getListaPrecio);

router.post("/listaPrecio", authToken, createListaPrecio);

router.delete("/listaPrecio/:id", authToken, deleteListaPrecio);

router.put("/listaPrecio/:id", authToken, updateListaPrecio);

router.get("/listaPrecioItem/:id", authToken, getListaPrecioItem);

router.delete("/listaPrecioItem", authToken, deleteListaPrecioItems);

export default router;
