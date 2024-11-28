// Este archivo maneja las rutas y operaciones relacionadas con la entidad "Asignatura" en la API

// Importación de librerías y controladores
import express, { Request, Response } from 'express'; // Importa express y los tipos Request y Response
import * as asignaturaController from '../controllers/asignaturaController'; // Importa el controlador de asignaturas
import { Asignatura } from '../models/asignaturaModel'; // Importa el modelo de Asignatura

// Crea un router para las rutas de asignaturas
const asignaturaRouter = express.Router();

// RUTA POST -> Crear una nueva asignatura
asignaturaRouter.post('/', async (req: Request, res: Response) => {
    const newAsignatura: Asignatura = req.body; // Obtiene la nueva asignatura del cuerpo de la solicitud

    // Llama al controlador para crear una nueva asignatura en la base de datos
    asignaturaController.create(newAsignatura, (err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }

        // Si la creación es exitosa, devuelve el resultado con el código de estado correspondiente
        res.status(result.statusCode).json(result);
    });
});

// RUTA GET -> Obtener todas las asignaturas
asignaturaRouter.get('/', (req: Request, res: Response) => {
    // Llama al controlador para obtener todas las asignaturas
    asignaturaController.findAll((err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        // Si la consulta es exitosa, devuelve todas las asignaturas con el código de estado 200
        res.status(200).json(result);
    });
});

// RUTA GET -> Obtener una asignatura específica por su ID
asignaturaRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id; // Obtiene el ID de la asignatura de los parámetros de la URL

    // Llama al controlador para obtener la asignatura con el ID proporcionado
    asignaturaController.findById(id, (err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra la asignatura, devuelve un error 404
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        // Si se encuentra la asignatura, la devuelve con el código de estado 200
        res.status(200).json(result);
    });
});

// RUTA PUT -> Actualizar una asignatura existente
asignaturaRouter.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id; // Obtiene el ID de la asignatura de los parámetros de la URL
    const updatedAsignatura = req.body; // Obtiene los datos actualizados de la asignatura del cuerpo de la solicitud

    // Llama al controlador para actualizar la asignatura con el ID proporcionado
    asignaturaController.update(id, updatedAsignatura, (err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra la asignatura, devuelve un error 404
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        // Si la actualización es exitosa, devuelve el mensaje de éxito con el código de estado 200
        res.status(200).json({ message: 'Asignatura actualizada exitosamente', data: result });
    });
});

// RUTA DELETE -> Eliminar una asignatura por su ID
asignaturaRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id; // Obtiene el ID de la asignatura de los parámetros de la URL

    // Llama al controlador para eliminar la asignatura con el ID proporcionado
    asignaturaController.deleteById(id, (err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra la asignatura, devuelve un error 404
            return res.status(404).json({ message: 'Asignatura no encontrada' });
        }
        // Si la eliminación es exitosa, devuelve el mensaje de éxito con el código de estado 200
        res.status(200).json({ message: 'Asignatura eliminada exitosamente' });
    });
});

// Exporta el router para que sea utilizado en otras partes de la aplicación
export { asignaturaRouter };

