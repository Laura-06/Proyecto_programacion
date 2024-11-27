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

inscribeRouter.post('/', (req, res) => {
    const inscribe = req.body; // Obtenemos los datos del cuerpo de la petición
    inscribeController.create(inscribe, (err:Error, result:any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(result.statusCode).json(result);
    });
});

inscribeRouter.get('/asignatura/:codAsignatura/grupo/:grupo', (req, res) => {
    const codAsignatura = parseInt(req.params.codAsignatura);
    const grupo = req.params.grupo;

    inscribeController.findEstudiantesByAsignaturaGrupo(codAsignatura, grupo, (err:Error, result:any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(result);
    });
});

inscribeRouter.get('/estudiante/:codEstudiante', (req, res) => {
    const codEstudiante = parseInt(req.params.codEstudiante);

    inscribeController.findAsignaturasByEstudiante(codEstudiante, (err:Error, result:any) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(result);
    });
});

inscribeRouter.put('/estudiante/:codEstudiante/asignatura/:codAsignatura', (req, res) => {
    const codEstudiante = parseInt(req.params.codEstudiante);
    const codAsignatura = parseInt(req.params.codAsignatura);
    const { n1, n2, n3 } = req.body; // Notas a actualizar

    inscribeController.updateNotas(
        codEstudiante,
        codAsignatura,
        { n1, n2, n3 },
        (err:Error, result:any) => {
            if (err) return res.status(500).json({ message: err.message });
            res.status(result.statusCode).json(result);
        }
    );
});


inscribeRouter.delete('/:id', (req, res) => {
    res.status(403).json({
        message: 'Eliminar inscripciones está prohibido según las reglas de negocio.'
    });
});

export { inscribeRouter };
