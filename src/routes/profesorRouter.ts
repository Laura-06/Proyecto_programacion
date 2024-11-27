import express, { Request, Response } from 'express';
import * as profesorController from '../controllers/profesorController'; // Asegúrate que el controlador está bien importado

const profesorRouter = express.Router();

// Ruta para crear un profesor
profesorRouter.post('/', (req: Request, res: Response) => {
    const profesor = req.body;  // El cuerpo de la solicitud contiene los datos del profesor
    profesorController.create(profesor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});

// Método GET -> (Obtener todas las asignaturas)
profesorRouter.get('/', (req: Request, res: Response) => {
    profesorController.findAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(result);
    });
});


// Método GET -> (Obtener una asignatura específica)
profesorRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    profesorController.findById(id, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.status(200).json(result);
    });
});


// Método PUT -> Actualizar
profesorRouter.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedAsignatura = req.body;

    profesorController.update(id, updatedAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.status(200).json({ message: 'Profesor actualizado exitosamente', data: result });
    });
});


// Método DELETE -> Eliminar
profesorRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    profesorController.deleteById(id, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.status(200).json({ message: 'Profesor eliminado exitosamente' });
    });
});

export { profesorRouter };