import express, { Request, Response } from 'express';
import * as estudianteController from '../controllers/estudianteController';
import { Estudiante } from '../models/estudianteModel';
const estudianteRouter = express.Router();
 
estudianteRouter.post('/', async (req: Request, res: Response) => {
    const newEstudiante: Estudiante = req.body;
    estudianteController.create(newEstudiante, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

// Método GET -> (Obtener todas las asignaturas)
estudianteRouter.get('/', (req: Request, res: Response) => {
    estudianteController.findAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(result);
    });
});


// Método GET -> (Obtener una asignatura específica)
estudianteRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    estudianteController.findById(id, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(result);
    });
});


// Método PUT -> Actualizar
estudianteRouter.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedAsignatura = req.body;

    estudianteController.update(id, updatedAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json({ message: 'Estudiante actualizado exitosamente', data: result });
    });
});


// Método DELETE -> Eliminar
estudianteRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    estudianteController.deleteById(id, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
    });
});

export { estudianteRouter };