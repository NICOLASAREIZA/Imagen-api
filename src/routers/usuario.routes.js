import { Router } from "express";
import { actualizarusuario, crearusuario, eliminarusuario, listarusuario, mostarusuario } from "../controller/usuario.controller.js"
import { validartoken } from "../controller/autenticacion.js";

const router = Router();

router.get("/listar",validartoken, listarusuario)
router.post("/listar", crearusuario)
router.put("/listar/:id_Usuario", actualizarusuario)
router.get("/listar/:id_Usuario", mostarusuario)
router.delete("/listar/:id_Usuario", eliminarusuario)

export default router