import { pool } from "../database/conexion.js";
import multer from "multer";


const storage = multer.diskStorage(
    {
        destination: function(req,img,cb){
            cb(null,"public/img")
        },
        filename: function(req,img,cb){
            cb(null,img.originalname)
        }
    }
);

const upload = multer({storage:storage});
export const cargarImagen = upload.single('img');


export const guardarjuegos = async (req, res) => {
    try {
        const {nombre,descripcion,precio} = req.body
        const imagen = req.file.originalname;
        const [resultado] = await pool.query("insert into juegos(nombre,descripcion,imagen,precio) values (?,?,?,?)", [nombre,descripcion,imagen,precio])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "juegos creado con exito"
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

