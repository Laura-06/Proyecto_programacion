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
const express_1 = __importDefault(require("express"));
const asignaturaController = __importStar(require("../controllers/asignaturaController"));
const asignaturaRouter = express_1.default.Router();
exports.asignaturaRouter = asignaturaRouter;
//Metodo post -> Crear
asignaturaRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAsignatura = req.body;
    asignaturaController.create(newAsignatura, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
// Método GET -> (Obtener todas las asignaturas)
asignaturaRouter.get('/', (req, res) => {
    asignaturaController.findAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(result);
    });
});
// Método GET -> (Obtener una asignatura específica)
asignaturaRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    asignaturaController.findById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        res.status(200).json(result);
    });
});
// Método PUT -> Actualizar
asignaturaRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedAsignatura = req.body;
    asignaturaController.update(id, updatedAsignatura, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        res.status(200).json({ message: 'Asignatura actualizada exitosamente', data: result });
    });
});
// Método DELETE -> Eliminar
asignaturaRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    asignaturaController.deleteById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        res.status(200).json({ message: 'Asignatura eliminada exitosamente' });
    });
});
