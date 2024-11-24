import express, { Request, Response } from 'express';
import * as asignaturaController from '../controllers/asignaturaController';
import { Asignatura } from '../models/asignaturaModel';

const asignaturaRouter = express.Router();

asignaturaRouter.post('/', async (req: Request, res: Response) => {
    const newAsignatura: Asignatura = req.body;
    asignaturaController.create(newAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

export { asignaturaRouter };
