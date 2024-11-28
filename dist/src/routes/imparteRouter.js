"use strict";
// Este archivo maneja las rutas y operaciones relacionadas con la entidad "Imparte" en la API
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
exports.imparteRouter = void 0;
// Importación de librerías y controladores
const express_1 = __importDefault(require("express")); // Importa express y los tipos Request y Response
const imparteController = __importStar(require("../controllers/imparteController")); // Importa el controlador de "Imparte"
// Crea un router para las rutas de "Imparte"
const imparteRouter = express_1.default.Router();
exports.imparteRouter = imparteRouter;
// RUTA POST -> Crear una nueva asignatura impartida por un profesor
imparteRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newImparte = req.body; // Obtiene la nueva relación "Imparte" del cuerpo de la solicitud
    // Llama al controlador para crear una nueva relación "Imparte" en la base de datos
    imparteController.create(newImparte, (err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        // Si la creación es exitosa, devuelve el resultado con el código de estado correspondiente
        res.status(result.statusCode).json(result);
    });
}));
// RUTA GET -> Obtener todas las asignaturas que un profesor imparte (por ID de profesor)
imparteRouter.get('/profesor/:id', (req, res) => {
    const idProfesor = parseInt(req.params.id); // Obtiene el ID del profesor de los parámetros de la URL
    // Llama al controlador para obtener todas las asignaturas que imparte el profesor
    imparteController.findAsignaturasByProfesor(idProfesor, (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(200).json(result); // Si la consulta es exitosa, devuelve las asignaturas con el código de estado 200
    });
});
// RUTA GET -> Obtener todos los profesores que imparten una asignatura específica (por código de asignatura)
imparteRouter.get('/asignatura/:id', (req, res) => {
    const codAsignatura = parseInt(req.params.id); // Obtiene el código de la asignatura de los parámetros de la URL
    // Llama al controlador para obtener todos los profesores que imparten la asignatura
    imparteController.findProfesoresByAsignatura(codAsignatura, (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(200).json(result); // Si la consulta es exitosa, devuelve los profesores con el código de estado 200
    });
});
// RUTA PUT -> Actualizar grupo y horario de una relación "Imparte"
imparteRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Obtiene el ID de la relación "Imparte" de los parámetros de la URL
    const { grupo, horario } = req.body; // Obtiene el nuevo grupo y horario del cuerpo de la solicitud
    // Llama al controlador para actualizar los datos del grupo y horario de la relación "Imparte"
    imparteController.updateGrupoHorario(id, grupo, horario, (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(result.statusCode).json(result); // Si la actualización es exitosa, devuelve el resultado
    });
});
// RUTA DELETE -> Eliminar una relación "Imparte" por su ID
imparteRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Obtiene el ID de la relación "Imparte" de los parámetros de la URL
    // Llama al controlador para eliminar la relación "Imparte" con el ID proporcionado
    imparteController.deleteImparte(id, (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(result.statusCode).json(result); // Si la eliminación es exitosa, devuelve el resultado
    });
});
