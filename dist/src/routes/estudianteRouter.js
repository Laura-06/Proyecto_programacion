"use strict";
// Este archivo maneja las rutas y operaciones relacionadas con la entidad "Estudiante" en la API
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
exports.estudianteRouter = void 0;
// Importación de librerías y controladores
const express_1 = __importDefault(require("express")); // Importa express y los tipos Request y Response
const estudianteController = __importStar(require("../controllers/estudianteController")); // Importa el controlador de estudiantes
// Crea un router para las rutas de estudiantes
const estudianteRouter = express_1.default.Router();
exports.estudianteRouter = estudianteRouter;
// RUTA POST -> Crear un nuevo estudiante
estudianteRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newEstudiante = req.body; // Obtiene el nuevo estudiante del cuerpo de la solicitud
    // Llama al controlador para crear un nuevo estudiante en la base de datos
    estudianteController.create(newEstudiante, (err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ 'message': err.message });
        }
        // Si la creación es exitosa, devuelve el resultado con el código de estado correspondiente
        res.status(result.statusCode).json(result);
    });
}));
// RUTA GET -> Obtener todos los estudiantes
estudianteRouter.get('/', (req, res) => {
    // Llama al controlador para obtener todos los estudiantes
    estudianteController.findAll((err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        // Si la consulta es exitosa, devuelve todos los estudiantes con el código de estado 200
        res.status(200).json(result);
    });
});
// RUTA GET -> Obtener un estudiante específico por su ID
estudianteRouter.get('/:id', (req, res) => {
    const id = req.params.id; // Obtiene el ID del estudiante de los parámetros de la URL
    // Llama al controlador para obtener el estudiante con el ID proporcionado
    estudianteController.findById(id, (err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra el estudiante, devuelve un error 404
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        // Si se encuentra el estudiante, lo devuelve con el código de estado 200
        res.status(200).json(result);
    });
});
// RUTA PUT -> Actualizar los datos de un estudiante existente
estudianteRouter.put('/:id', (req, res) => {
    const id = req.params.id; // Obtiene el ID del estudiante de los parámetros de la URL
    const updatedEstudiante = req.body; // Obtiene los datos actualizados del estudiante del cuerpo de la solicitud
    // Llama al controlador para actualizar los datos del estudiante con el ID proporcionado
    estudianteController.update(id, updatedEstudiante, (err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra el estudiante, devuelve un error 404
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        // Si la actualización es exitosa, devuelve el mensaje de éxito con el código de estado 200
        res.status(200).json({ message: 'Estudiante actualizado exitosamente', data: result });
    });
});
// RUTA DELETE -> Eliminar un estudiante por su ID
estudianteRouter.delete('/:id', (req, res) => {
    const id = req.params.id; // Obtiene el ID del estudiante de los parámetros de la URL
    // Llama al controlador para eliminar el estudiante con el ID proporcionado
    estudianteController.deleteById(id, (err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra el estudiante, devuelve un error 404
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        // Si la eliminación es exitosa, devuelve el mensaje de éxito con el código de estado 200
        res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
    });
});
