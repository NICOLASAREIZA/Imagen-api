import { check } from "express-validator"


export const validarregistro=[
check('nombres','es obligatorio').not().isEmpty().isLength({max:50}),
check('correo','es obligartorio').isEmail()
]