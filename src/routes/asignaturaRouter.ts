import express, { Request, Response } from 'express';
import * as asignaturaController from '../controllers/asignaturaController';
import { Asignatura } from '../models/asignaturaModel';

const asignaturaRouter = express.Router();


//Metodo post -> Crear
asignaturaRouter.post('/', async (req: Request, res: Response) => {
    const newAsignatura: Asignatura = req.body;
    asignaturaController.create(newAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

// Método GET -> (Obtener todas las asignaturas)
asignaturaRouter.get('/', (req: Request, res: Response) => {
    asignaturaController.findAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(result);
    });
});


// Método GET -> (Obtener una asignatura específica)
asignaturaRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    asignaturaController.findById(id, (err: Error, result: any) => {
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
asignaturaRouter.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedAsignatura = req.body;

    asignaturaController.update(id, updatedAsignatura, (err: Error, result: any) => {
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
asignaturaRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    asignaturaController.deleteById(id, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        res.status(200).json({ message: 'Asignatura eliminada exitosamente' });
    });
});



export { asignaturaRouter };
