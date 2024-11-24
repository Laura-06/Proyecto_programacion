import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparteController';
import { Imparte } from '../models/imparteModel';

const imparteRouter = express.Router();

imparteRouter.post('/', async (req: Request, res: Response) => {
    const newImparte: Imparte = req.body;
    imparteController.create(newImparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

export { imparteRouter };
