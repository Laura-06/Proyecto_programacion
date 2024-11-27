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

imparteRouter.get('/profesor/:id', (req, res) => {
    const idProfesor = parseInt(req.params.id);
    imparteController.findAsignaturasByProfesor(idProfesor, (err:Error, result:any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(result);
    });
});

imparteRouter.get('/asignatura/:id', (req, res) => {
    const codAsignatura = parseInt(req.params.id);
    imparteController.findProfesoresByAsignatura(codAsignatura, (err:Error, result:any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(result);
    });
});

imparteRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { grupo, horario } = req.body;
    imparteController.updateGrupoHorario(id, grupo, horario, (err:Error, result:any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(result.statusCode).json(result);
    });
});

imparteRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    imparteController.deleteImparte(id, (err:Error, result:any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(result.statusCode).json(result);
    });
});


export { imparteRouter };
