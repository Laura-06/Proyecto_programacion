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

export { profesorRouter };
