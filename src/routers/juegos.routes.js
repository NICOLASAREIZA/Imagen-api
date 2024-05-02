import { Router } from "express";
import { cargarImagen, guardarjuegos } from "../controller/juegos.controller.js";


const router = Router()

router.post("/crearjuegos",cargarImagen, guardarjuegos)

export default router