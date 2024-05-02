import { pool } from "../database/conexion.js";


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


export const crearusuario = async (req, res) => {
    try {
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

export const actualizarusuario = async (req,res) => {
    try {
        const {id_Usuario} = req.params
        const {nombres,direccion,telefono,correo,rol,password} = req.body
        const [ oldUser ] = await pool.query("select * from usuarios where id_Usuario=?", [id_Usuario])
        const [ resultado ] =await pool.query(`update usuarios set nombres='${nombres?nombres:oldUser[0].nombres}',direccion='${direccion?direccion:oldUser[0].direccion}',telefono='${telefono?telefono:oldUser[0].telefono}',correo='${correo?correo:oldUser[0].correo}',rol='${rol?rol:oldUser[0].rol}',password='${password?password:oldUser[0].password}' where id_Usuario=${parseInt(id_Usuario)}`)

        if (resultado.aproductosRows > 0) {
            res.status(200).json({
                "mensaje": "los usuarios ha sido actualizado"
            })
        } else {
            productostus(404).json({
                "mensaje": "No se pudo actualizar las usuarios"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": "el servidor cayo en actualizar" +error
        })
    }   
}

export const mostarusuario = async (req, res) => {
    try {
        const { id_Usuario } = req.params;
        const [ resultado ] = await pool.query("select * from usuarios where id_Usuario=?", [id_Usuario])

        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(400).json({
                "mensaje": "No se encontró ese usuarios con ese ID"
            })
        }

    }  catch (error) {
        res.status(500).json({
            "mensaje": error
        })     
    }
}

export const eliminarusuario = async (req, res) => {
    try{
        const { id_Usuario } = req.params;
        const [ resultado ] = await pool.query("delete from usuarios where id_Usuario", [id_Usuario])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Haz eliminado con exito al usuarios"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se encontró el usuarios con ese ID y no se puedo eliminar"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}