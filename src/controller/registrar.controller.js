import { pool } from "../database/conexion.js";
import {validationResult} from 'express-validator'

export const listarusuario = async(req,res)=>{
try{
    const [result] =await pool.query('select * from usuarios');
        if (result.length > 0){ 
            res.status(200).json(result)
        }else{
              res.status(404).json({
                "mensage":"no se pudo listar hay un error"
              })
        }
} catch (error){
    res.status(500).json({
        message:"error en el servidor listar: " +error
    })
    }
}

export const registrarusuario = async(req,res) =>{
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors})
        }
                const {nombres,direccion,telefono,correo,rol,password} = req.body
                const [resultado] = await pool.query("insert into usuarios(nombres,direccion,telefono,correo,rol,password) values (?,?,?,?,?,?)", [nombres,direccion,telefono,correo,rol,password])
        
                if (resultado.affectedRows > 0) {
                    res.status(200).json({
                        "mensaje": "usuario creado con exito"
                    })
                } else {
                    res.status(400).json({
                        "mensaje": "hay un error no se pudo guardar"
                    })
                }
            } catch (error) {
                res.status(500).json({
                    "mensaje": "error en servidor crear" +error
                })
            }   
        }
