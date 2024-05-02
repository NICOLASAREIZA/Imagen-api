
import { pool } from "../database/conexion.js";
import jwt from "jsonwebtoken"

export const validardatos = async(req,res) =>{
    try{
    const {correo,password} = req.body
    const [result] =await pool.query(`select * from usuarios where correo="${correo}" and password="${password}"`)
    
    if(result.length > 0){
        const token = jwt.sign({result},process.env.AUT_SECRET,{expiresIn:process.env.AUT_EXPIRE}); 

        res.status(200).json({'user':result, 'token':token, "mensaje":"el usuario a sido actualizado, vamos con toda 🚪🤾‍♂️🏃‍♂️"})
    
    }else{
        res.status(404).json({"mensaje":"esta mal compadre"})
    }
}catch(error){
 res.status(500).json({"mensaje":"no sirve nada 😭"} + error)
}
}

export const validartoken = async(req,res,next)=>{ 
    const tokencliente = req.headers['token']
    if(!tokencliente){
        res.status(404).json({"mensaje":"token es requerido"})
    }else{
        const tokenotro = jwt.verify(tokencliente,process.env.AUT_SECRET,(error, decode)=>{
            if(error){
                res.status(404).json({"mensaje":"token no valido"});
            }else{
                next();
            }
        })
    }
}