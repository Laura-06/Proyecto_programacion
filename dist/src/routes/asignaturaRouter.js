"use strict";
// Este archivo maneja las rutas y operaciones relacionadas con la entidad "Asignatura" en la API
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
exports.asignaturaRouter = void 0;
// Importación de librerías y controladores
const express_1 = __importDefault(require("express")); // Importa express y los tipos Request y Response
const asignaturaController = __importStar(require("../controllers/asignaturaController")); // Importa el controlador de asignaturas
// Crea un router para las rutas de asignaturas
const asignaturaRouter = express_1.default.Router();
exports.asignaturaRouter = asignaturaRouter;
// RUTA POST -> Crear una nueva asignatura
asignaturaRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAsignatura = req.body; // Obtiene la nueva asignatura del cuerpo de la solicitud
    // Llama al controlador para crear una nueva asignatura en la base de datos
    asignaturaController.create(newAsignatura, (err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        // Si la creación es exitosa, devuelve el resultado con el código de estado correspondiente
        res.status(result.statusCode).json(result);
    });
}));
// RUTA GET -> Obtener todas las asignaturas
asignaturaRouter.get('/', (req, res) => {
    // Llama al controlador para obtener todas las asignaturas
    asignaturaController.findAll((err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        // Si la consulta es exitosa, devuelve todas las asignaturas con el código de estado 200
        res.status(200).json(result);
    });
});
// RUTA GET -> Obtener una asignatura específica por su ID
asignaturaRouter.get('/:id', (req, res) => {
    const id = req.params.id; // Obtiene el ID de la asignatura de los parámetros de la URL
    // Llama al controlador para obtener la asignatura con el ID proporcionado
    asignaturaController.findById(id, (err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra la asignatura, devuelve un error 404
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        // Si se encuentra la asignatura, la devuelve con el código de estado 200
        res.status(200).json(result);
    });
});
// RUTA PUT -> Actualizar una asignatura existente
asignaturaRouter.put('/:id', (req, res) => {
    const id = req.params.id; // Obtiene el ID de la asignatura de los parámetros de la URL
    const updatedAsignatura = req.body; // Obtiene los datos actualizados de la asignatura del cuerpo de la solicitud
    // Llama al controlador para actualizar la asignatura con el ID proporcionado
    asignaturaController.update(id, updatedAsignatura, (err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra la asignatura, devuelve un error 404
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        // Si la actualización es exitosa, devuelve el mensaje de éxito con el código de estado 200
        res.status(200).json({ message: 'Asignatura actualizada exitosamente', data: result });
    });
});
// RUTA DELETE -> Eliminar una asignatura por su ID
asignaturaRouter.delete('/:id', (req, res) => {
    const id = req.params.id; // Obtiene el ID de la asignatura de los parámetros de la URL
    // Llama al controlador para eliminar la asignatura con el ID proporcionado
    asignaturaController.deleteById(id, (err, result) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra la asignatura, devuelve un error 404
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        // Si la eliminación es exitosa, devuelve el mensaje de éxito con el código de estado 200
        res.status(200).json({ message: 'Asignatura eliminada exitosamente' });
    });
});
