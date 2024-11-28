"use strict";
// Configuración y conexión a la base de datos MySQL utilizando mysql2
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
exports.db = void 0;
// Importación de las dependencias necesarias
const mysql2_1 = __importDefault(require("mysql2")); // Importa la librería mysql2 para interactuar con MySQL
const dotenv = __importStar(require("dotenv")); // Importa dotenv para manejar variables de entorno
// Cargar las variables de entorno desde un archivo .env
dotenv.config(); // Carga las variables de entorno para que estén disponibles en el proceso
// Configuración de la conexión a la base de datos utilizando las variables de entorno
exports.db = mysql2_1.default.createConnection({
    host: process.env.DB_HOST, // La dirección del host de la base de datos (desde las variables de entorno)
    user: process.env.DB_USER, // El nombre de usuario para la conexión (desde las variables de entorno)
    password: process.env.DB_PWD, // La contraseña para la conexión (desde las variables de entorno)
    database: process.env.DB_NAME, // El nombre de la base de datos (desde las variables de entorno)
    port: Number(process.env.DB_PORT) || 3306, // El puerto de la base de datos (utiliza 3306 por defecto si no se especifica)
});
// Probar la conexión a la base de datos
exports.db.connect((err) => {
    if (err) { // Si ocurre un error en la conexión
        console.error("Error al conectar a la base de datos:", err.message); // Imprime el mensaje de error
    }
    else { // Si la conexión es exitosa
        console.log("Conexión exitosa a la base de datos"); // Imprime un mensaje de éxito
    }
});
