// Este archivo maneja las rutas y operaciones relacionadas con las inscripciones de estudiantes en asignaturas

// Importación de librerías y controladores
import express, { Request, Response } from 'express'; // Importa express y los tipos Request y Response
import * as inscribeController from '../controllers/inscribeController'; // Importa el controlador de inscripciones
import { Inscribe } from '../models/inscribeModel'; // Importa el modelo de inscripción

// Crea un router para las rutas de "Inscribe"
const inscribeRouter = express.Router();

// RUTA POST -> Crear una nueva inscripción de un estudiante en una asignatura
inscribeRouter.post('/', async (req: Request, res: Response) => {
    const newInscribe: Inscribe = req.body; // Obtiene la nueva inscripción desde el cuerpo de la solicitud

    // Llama al controlador para crear una nueva inscripción
    inscribeController.create(newInscribe, (err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }

        // Si la creación es exitosa, devuelve el resultado con el código de estado correspondiente
        res.status(result.statusCode).json(result);
    });
});

// RUTA POST -> Crear una inscripción (duplicada, ya que esta línea es idéntica a la anterior)
// Esto puede ser un error y posiblemente se debiera eliminar
inscribeRouter.post('/', (req, res) => {
    const inscribe = req.body; // Obtiene los datos del cuerpo de la petición
    // Llama al controlador para crear la inscripción
    inscribeController.create(inscribe, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(result.statusCode).json(result); // Si la creación es exitosa, devuelve el resultado
    });
});

// RUTA GET -> Obtener estudiantes inscritos en una asignatura y grupo específicos
inscribeRouter.get('/asignatura/:codAsignatura/grupo/:grupo', (req, res) => {
    const codAsignatura = parseInt(req.params.codAsignatura); // Obtiene el código de la asignatura de los parámetros
    const grupo = req.params.grupo; // Obtiene el grupo de los parámetros

    // Llama al controlador para obtener los estudiantes inscritos en la asignatura y grupo
    inscribeController.findEstudiantesByAsignaturaGrupo(codAsignatura, grupo, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(200).json(result); // Si la consulta es exitosa, devuelve los estudiantes
    });
});

// RUTA GET -> Obtener asignaturas en las que un estudiante está inscrito
inscribeRouter.get('/estudiante/:codEstudiante', (req, res) => {
    const codEstudiante = parseInt(req.params.codEstudiante); // Obtiene el código del estudiante de los parámetros

    // Llama al controlador para obtener las asignaturas del estudiante
    inscribeController.findAsignaturasByEstudiante(codEstudiante, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(200).json(result); // Si la consulta es exitosa, devuelve las asignaturas
    });
});

// RUTA PUT -> Actualizar las notas de un estudiante en una asignatura específica
inscribeRouter.put('/estudiante/:codEstudiante/asignatura/:codAsignatura', (req, res) => {
    const codEstudiante = parseInt(req.params.codEstudiante); // Obtiene el código del estudiante de los parámetros
    const codAsignatura = parseInt(req.params.codAsignatura); // Obtiene el código de la asignatura de los parámetros
    const { n1, n2, n3 } = req.body; // Obtiene las nuevas notas desde el cuerpo de la solicitud

    // Llama al controlador para actualizar las notas del estudiante en la asignatura
    inscribeController.updateNotas(
        codEstudiante,
        codAsignatura,
        { n1, n2, n3 }, // Pasa las notas como un objeto
        (err: Error, result: any) => {
            if (err) return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
            res.status(result.statusCode).json(result); // Si la actualización es exitosa, devuelve el resultado
        }
    );
});

// RUTA DELETE -> Eliminar una inscripción (Eliminación prohibida según las reglas de negocio)
inscribeRouter.delete('/:id', (req, res) => {
    // Responde con un error 403 ya que eliminar inscripciones no está permitido
    res.status(403).json({
        message: 'Eliminar inscripciones está prohibido según las reglas de negocio.'
    });
});

// Exporta el router para que sea utilizado en otras partes de la aplicación
export { inscribeRouter };

