import { Router } from "express";
import { validardatos } from "../controller/autenticacion.js";


const autRouter = Router();

autRouter.post('/validar', validardatos)

export default autRouter