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
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser")); //se utiliza para parsear las librerías
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db"); // importa el archivo db.ts
// Rutas importadas
const estudianteRouter_1 = require("./src/routes/estudianteRouter");
const profesorRouter_1 = require("./src/routes/profesorRouter");
const asignaturaRouter_1 = require("./src/routes/asignaturaRouter");
const imparteRouter_1 = require("./src/routes/imparteRouter");
const inscribeRouter_1 = require("./src/routes/inscribeRouter");
const app = (0, express_1.default)();
// Configuración del entorno
dotenv.config();
// Middleware
app.use(bodyParser.json());
app.use((0, cors_1.default)());
// Rutas principales
app.get("/", (req, res) => {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});
// Usar las rutas de los diferentes modelos
app.use('/estudiantes', estudianteRouter_1.estudianteRouter);
app.use('/profesores', profesorRouter_1.profesorRouter);
app.use('/asignaturas', asignaturaRouter_1.asignaturaRouter);
app.use('/imparte', imparteRouter_1.imparteRouter);
app.use('/inscribe', inscribeRouter_1.inscribeRouter);
// Conexión a la base de datos
db_1.db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    }
    else {
        console.log('Database Connected');
    }
});
// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ error: 'Not found', message: 'URL not found' });
});
// Arrancar el servidor
app.listen(process.env.PORT, () => {
    console.log('Node server started running');
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
});
