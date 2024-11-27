import mysql from "mysql2";
import * as dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// Configuración de la conexión
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
});

// Probar conexión
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});