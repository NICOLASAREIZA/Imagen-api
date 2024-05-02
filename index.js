import express from "express"
import bodyParser from "body-parser";
import registrar  from "./src/routers/registrar.routes.js";
import autenticar from "./src/routers/autenticacion.routes.js";
import usuario from "./src/routers/usuario.routes.js"
import juegos from "./src/routers/juegos.routes.js"

const app = express();
const port= 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.set('views engine','ejs')
app.set('views','./views')
app.use(express.static('./public'))


app.get('/document',(req, res)=>{
    res.render('document.ejs')
})

app.use(express.static('/public'))

app.use(autenticar)
app.use(registrar)
app.use(usuario)
app.use(juegos)



app.listen(port,()=>{
    console.log(`servidor corriendo excelentemente ${port} ✈🪂☠`)
})