"use strict";
// Este archivo maneja las rutas y operaciones relacionadas con las inscripciones de estudiantes en asignaturas
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inscribeRouter = void 0;
// Importación de librerías y controladores
const express_1 = __importDefault(require("express")); // Importa express y los tipos Request y Response
const inscribeController = __importStar(require("../controllers/inscribeController")); // Importa el controlador de inscripciones
// Crea un router para las rutas de "Inscribe"
const inscribeRouter = express_1.default.Router();
exports.inscribeRouter = inscribeRouter;
// RUTA POST -> Crear una nueva inscripción de un estudiante en una asignatura
inscribeRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newInscribe = req.body; // Obtiene la nueva inscripción desde el cuerpo de la solicitud
    // Llama al controlador para crear una nueva inscripción
    inscribeController.create(newInscribe, (err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        // Si la creación es exitosa, devuelve el resultado con el código de estado correspondiente
        res.status(result.statusCode).json(result);
    });
}));
// RUTA POST -> Crear una inscripción (duplicada, ya que esta línea es idéntica a la anterior)
// Esto puede ser un error y posiblemente se debiera eliminar
inscribeRouter.post('/', (req, res) => {
    const inscribe = req.body; // Obtiene los datos del cuerpo de la petición
    // Llama al controlador para crear la inscripción
    inscribeController.create(inscribe, (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(result.statusCode).json(result); // Si la creación es exitosa, devuelve el resultado
    });
});
// RUTA GET -> Obtener estudiantes inscritos en una asignatura y grupo específicos
inscribeRouter.get('/asignatura/:codAsignatura/grupo/:grupo', (req, res) => {
    const codAsignatura = parseInt(req.params.codAsignatura); // Obtiene el código de la asignatura de los parámetros
    const grupo = req.params.grupo; // Obtiene el grupo de los parámetros
    // Llama al controlador para obtener los estudiantes inscritos en la asignatura y grupo
    inscribeController.findEstudiantesByAsignaturaGrupo(codAsignatura, grupo, (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(200).json(result); // Si la consulta es exitosa, devuelve los estudiantes
    });
});
// RUTA GET -> Obtener asignaturas en las que un estudiante está inscrito
inscribeRouter.get('/estudiante/:codEstudiante', (req, res) => {
    const codEstudiante = parseInt(req.params.codEstudiante); // Obtiene el código del estudiante de los parámetros
    // Llama al controlador para obtener las asignaturas del estudiante
    inscribeController.findAsignaturasByEstudiante(codEstudiante, (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(200).json(result); // Si la consulta es exitosa, devuelve las asignaturas
    });
});
// RUTA PUT -> Actualizar las notas de un estudiante en una asignatura específica
inscribeRouter.put('/estudiante/:codEstudiante/asignatura/:codAsignatura', (req, res) => {
    const codEstudiante = parseInt(req.params.codEstudiante); // Obtiene el código del estudiante de los parámetros
    const codAsignatura = parseInt(req.params.codAsignatura); // Obtiene el código de la asignatura de los parámetros
    const { n1, n2, n3 } = req.body; // Obtiene las nuevas notas desde el cuerpo de la solicitud
    // Llama al controlador para actualizar las notas del estudiante en la asignatura
    inscribeController.updateNotas(codEstudiante, codAsignatura, { n1, n2, n3 }, // Pasa las notas como un objeto
    (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(result.statusCode).json(result); // Si la actualización es exitosa, devuelve el resultado
    });
});
// RUTA DELETE -> Eliminar una inscripción (Eliminación prohibida según las reglas de negocio)
inscribeRouter.delete('/:id', (req, res) => {
    // Responde con un error 403 ya que eliminar inscripciones no está permitido
    res.status(403).json({
        message: 'Eliminar inscripciones está prohibido según las reglas de negocio.'
    });
});
