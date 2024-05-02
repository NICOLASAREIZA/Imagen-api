import { Router } from "express";
import { validartoken } from "../controller/autenticacion.js";
import { listarusuario, registrarusuario } from "../controller/registrar.controller.js";
import { validarregistro } from "../../validate/registrar.validade.js";


const router = Router()

router.get("/listar",validartoken,listarusuario)
router.post("/registrar",validarregistro,registrarusuario)

export default router 