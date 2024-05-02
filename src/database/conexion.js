import {createPool} from "mysql2/promise";
import donvent from 'dotenv'
donvent.config({path:'./env/.env'})


export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.BD_PORT,
    database: process.env.BD_DATABASE
})