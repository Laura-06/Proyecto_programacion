// Configuración y conexión a la base de datos MySQL utilizando mysql2

// Importación de las dependencias necesarias
import mysql from "mysql2"; // Importa la librería mysql2 para interactuar con MySQL
import * as dotenv from "dotenv"; // Importa dotenv para manejar variables de entorno

// Cargar las variables de entorno desde un archivo .env
dotenv.config(); // Carga las variables de entorno para que estén disponibles en el proceso

// Configuración de la conexión a la base de datos utilizando las variables de entorno
export const db = mysql.createConnection({
    host: process.env.DB_HOST, // La dirección del host de la base de datos (desde las variables de entorno)
    user: process.env.DB_USER, // El nombre de usuario para la conexión (desde las variables de entorno)
    password: process.env.DB_PWD, // La contraseña para la conexión (desde las variables de entorno)
    database: process.env.DB_NAME, // El nombre de la base de datos (desde las variables de entorno)
    port: Number(process.env.DB_PORT) || 3306, // El puerto de la base de datos (utiliza 3306 por defecto si no se especifica)
});

// Probar la conexión a la base de datos
db.connect((err) => { // Intenta conectarse a la base de datos
    if (err) { // Si ocurre un error en la conexión
        console.error("Error al conectar a la base de datos:", err.message); // Imprime el mensaje de error
    } else { // Si la conexión es exitosa
        console.log("Conexión exitosa a la base de datos"); // Imprime un mensaje de éxito
    }
});
