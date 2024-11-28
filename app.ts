// Importación de dependencias necesarias
import * as dotenv from "dotenv"; // Importa dotenv para manejar variables de entorno
import express, { Request, Response } from "express"; // Importa Express y tipos para Request y Response
import * as bodyParser from "body-parser"; // Importa body-parser para parsear el cuerpo de las solicitudes
import cors from 'cors'; // Importa cors para habilitar solicitudes cruzadas entre dominios

// Importación de rutas específicas de la aplicación
import { db } from "./db"; // Importa la configuración de la base de datos desde db.ts

// Rutas importadas para cada entidad
import { estudianteRouter } from './src/routes/estudianteRouter'; // Ruta para gestionar estudiantes
import { profesorRouter } from './src/routes/profesorRouter'; // Ruta para gestionar profesores
import { asignaturaRouter } from './src/routes/asignaturaRouter'; // Ruta para gestionar asignaturas
import { imparteRouter } from './src/routes/imparteRouter'; // Ruta para gestionar las asignaturas que imparte un profesor
import { inscribeRouter } from './src/routes/inscribeRouter'; // Ruta para gestionar las inscripciones de los estudiantes

// Crear una instancia de la aplicación Express
const app = express();

// Configuración del entorno, cargando las variables de entorno desde un archivo .env
dotenv.config();

// Middleware para parsear las solicitudes entrantes
app.use(bodyParser.json()); // Parsear el cuerpo de la solicitud como JSON
app.use(cors()); // Habilitar el uso de CORS (Cross-Origin Resource Sharing) para solicitudes de diferentes dominios

// Ruta principal que responde con un mensaje de bienvenida
app.get("/", (req: Request, res: Response) => {
    res.type('text/plain'); // Especificar que la respuesta será de tipo texto plano
    res.status(200).send('Welcome!'); // Responder con un código de estado 200 y un mensaje de bienvenida
});

// Usar las rutas para manejar las diferentes entidades del sistema
app.use('/estudiantes', estudianteRouter); // Ruta para los estudiantes
app.use('/profesores', profesorRouter); // Ruta para los profesores
app.use('/asignaturas', asignaturaRouter); // Ruta para las asignaturas
app.use('/imparte', imparteRouter); // Ruta para gestionar las asignaturas que imparte un profesor
app.use('/inscribe', inscribeRouter); // Ruta para gestionar las inscripciones de los estudiantes

// Conexión a la base de datos
db.connect((err) => { // Intentar conectarse a la base de datos
    if (err) {
        console.log('Database connection error'); // Si ocurre un error en la conexión, se imprime un mensaje
    } else {
        console.log('Database Connected'); // Si la conexión es exitosa, se imprime un mensaje
    }
});

// Manejo de rutas no encontradas (404)
app.use((req: Request, res: Response) => {
    res.status(404).send({ error: 'Not found', message: 'URL not found' }); // Si la ruta no es encontrada, se responde con un error 404
});

// Arrancar el servidor de la aplicación Express
app.listen(process.env.PORT, () => { // El servidor escucha en el puerto definido en las variables de entorno
    console.log('Node server started running'); // Se imprime un mensaje indicando que el servidor está corriendo
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`); // Se imprime la URL de acceso al servidor
});
