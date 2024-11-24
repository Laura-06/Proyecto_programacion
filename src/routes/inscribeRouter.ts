import express, { Request, Response } from 'express';
import * as inscribeController from '../controllers/inscribeController';
import { Inscribe } from '../models/inscribeModel';

const inscribeRouter = express.Router();

inscribeRouter.post('/', async (req: Request, res: Response) => {
    const newInscribe: Inscribe = req.body;
    inscribeController.create(newInscribe, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

export { inscribeRouter };
