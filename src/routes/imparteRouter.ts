// Este archivo maneja las rutas y operaciones relacionadas con la entidad "Imparte" en la API

// Importación de librerías y controladores
import express, { Request, Response } from 'express'; // Importa express y los tipos Request y Response
import * as imparteController from '../controllers/imparteController'; // Importa el controlador de "Imparte"
import { Imparte } from '../models/imparteModel'; // Importa el modelo de "Imparte"

// Crea un router para las rutas de "Imparte"
const imparteRouter = express.Router();

// RUTA POST -> Crear una nueva asignatura impartida por un profesor
imparteRouter.post('/', async (req: Request, res: Response) => {
    const newImparte: Imparte = req.body; // Obtiene la nueva relación "Imparte" del cuerpo de la solicitud

    // Llama al controlador para crear una nueva relación "Imparte" en la base de datos
    imparteController.create(newImparte, (err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }

        // Si la creación es exitosa, devuelve el resultado con el código de estado correspondiente
        res.status(result.statusCode).json(result);
    });
});

// RUTA GET -> Obtener todas las asignaturas que un profesor imparte (por ID de profesor)
imparteRouter.get('/profesor/:id', (req, res) => {
    const idProfesor = parseInt(req.params.id); // Obtiene el ID del profesor de los parámetros de la URL
    // Llama al controlador para obtener todas las asignaturas que imparte el profesor
    imparteController.findAsignaturasByProfesor(idProfesor, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(200).json(result); // Si la consulta es exitosa, devuelve las asignaturas con el código de estado 200
    });
});

// RUTA GET -> Obtener todos los profesores que imparten una asignatura específica (por código de asignatura)
imparteRouter.get('/asignatura/:id', (req, res) => {
    const codAsignatura = parseInt(req.params.id); // Obtiene el código de la asignatura de los parámetros de la URL
    // Llama al controlador para obtener todos los profesores que imparten la asignatura
    imparteController.findProfesoresByAsignatura(codAsignatura, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(200).json(result); // Si la consulta es exitosa, devuelve los profesores con el código de estado 200
    });
});

// RUTA PUT -> Actualizar grupo y horario de una relación "Imparte"
imparteRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Obtiene el ID de la relación "Imparte" de los parámetros de la URL
    const { grupo, horario } = req.body; // Obtiene el nuevo grupo y horario del cuerpo de la solicitud

    // Llama al controlador para actualizar los datos del grupo y horario de la relación "Imparte"
    imparteController.updateGrupoHorario(id, grupo, horario, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(result.statusCode).json(result); // Si la actualización es exitosa, devuelve el resultado
    });
});

// RUTA DELETE -> Eliminar una relación "Imparte" por su ID
imparteRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Obtiene el ID de la relación "Imparte" de los parámetros de la URL

    // Llama al controlador para eliminar la relación "Imparte" con el ID proporcionado
    imparteController.deleteImparte(id, (err: Error, result: any) => {
        if (err) return res.status(500).json({ message: err.message }); // Si ocurre un error, devuelve un error 500
        res.status(result.statusCode).json(result); // Si la eliminación es exitosa, devuelve el resultado
    });
});

// Exporta el router para que sea utilizado en otras partes de la aplicación
export { imparteRouter };

