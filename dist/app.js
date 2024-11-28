"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importación de dependencias necesarias
const dotenv = __importStar(require("dotenv")); // Importa dotenv para manejar variables de entorno
const express_1 = __importDefault(require("express")); // Importa Express y tipos para Request y Response
const bodyParser = __importStar(require("body-parser")); // Importa body-parser para parsear el cuerpo de las solicitudes
const cors_1 = __importDefault(require("cors")); // Importa cors para habilitar solicitudes cruzadas entre dominios
// Importación de rutas específicas de la aplicación
const db_1 = require("./db"); // Importa la configuración de la base de datos desde db.ts
// Rutas importadas para cada entidad
const estudianteRouter_1 = require("./src/routes/estudianteRouter"); // Ruta para gestionar estudiantes
const profesorRouter_1 = require("./src/routes/profesorRouter"); // Ruta para gestionar profesores
const asignaturaRouter_1 = require("./src/routes/asignaturaRouter"); // Ruta para gestionar asignaturas
const imparteRouter_1 = require("./src/routes/imparteRouter"); // Ruta para gestionar las asignaturas que imparte un profesor
const inscribeRouter_1 = require("./src/routes/inscribeRouter"); // Ruta para gestionar las inscripciones de los estudiantes
// Crear una instancia de la aplicación Express
const app = (0, express_1.default)();
// Configuración del entorno, cargando las variables de entorno desde un archivo .env
dotenv.config();
// Middleware para parsear las solicitudes entrantes
app.use(bodyParser.json()); // Parsear el cuerpo de la solicitud como JSON
app.use((0, cors_1.default)()); // Habilitar el uso de CORS (Cross-Origin Resource Sharing) para solicitudes de diferentes dominios
// Ruta principal que responde con un mensaje de bienvenida
app.get("/", (req, res) => {
    res.type('text/plain'); // Especificar que la respuesta será de tipo texto plano
    res.status(200).send('Welcome!'); // Responder con un código de estado 200 y un mensaje de bienvenida
});
// Usar las rutas para manejar las diferentes entidades del sistema
app.use('/estudiantes', estudianteRouter_1.estudianteRouter); // Ruta para los estudiantes
app.use('/profesores', profesorRouter_1.profesorRouter); // Ruta para los profesores
app.use('/asignaturas', asignaturaRouter_1.asignaturaRouter); // Ruta para las asignaturas
app.use('/imparte', imparteRouter_1.imparteRouter); // Ruta para gestionar las asignaturas que imparte un profesor
app.use('/inscribe', inscribeRouter_1.inscribeRouter); // Ruta para gestionar las inscripciones de los estudiantes
// Conexión a la base de datos
db_1.db.connect((err) => {
    if (err) {
        console.log('Database connection error'); // Si ocurre un error en la conexión, se imprime un mensaje
    }
    else {
        console.log('Database Connected'); // Si la conexión es exitosa, se imprime un mensaje
    }
});
// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).send({ error: 'Not found', message: 'URL not found' }); // Si la ruta no es encontrada, se responde con un error 404
});
// Arrancar el servidor de la aplicación Express
app.listen(process.env.PORT, () => {
    console.log('Node server started running'); // Se imprime un mensaje indicando que el servidor está corriendo
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`); // Se imprime la URL de acceso al servidor
});
