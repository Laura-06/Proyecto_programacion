// Este archivo maneja las rutas y operaciones relacionadas con la entidad "Estudiante" en la API

// Importación de librerías y controladores
import express, { Request, Response } from 'express'; // Importa express y los tipos Request y Response
import * as estudianteController from '../controllers/estudianteController'; // Importa el controlador de estudiantes
import { Estudiante } from '../models/estudianteModel'; // Importa el modelo de Estudiante

// Crea un router para las rutas de estudiantes
const estudianteRouter = express.Router();

// RUTA POST -> Crear un nuevo estudiante
estudianteRouter.post('/', async (req: Request, res: Response) => {
    const newEstudiante: Estudiante = req.body; // Obtiene el nuevo estudiante del cuerpo de la solicitud

    // Llama al controlador para crear un nuevo estudiante en la base de datos
    estudianteController.create(newEstudiante, (err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ 'message': err.message });
        }

        // Si la creación es exitosa, devuelve el resultado con el código de estado correspondiente
        res.status(result.statusCode).json(result);
    });
});

// RUTA GET -> Obtener todos los estudiantes
estudianteRouter.get('/', (req: Request, res: Response) => {
    // Llama al controlador para obtener todos los estudiantes
    estudianteController.findAll((err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        // Si la consulta es exitosa, devuelve todos los estudiantes con el código de estado 200
        res.status(200).json(result);
    });
});

// RUTA GET -> Obtener un estudiante específico por su ID
estudianteRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id; // Obtiene el ID del estudiante de los parámetros de la URL

    // Llama al controlador para obtener el estudiante con el ID proporcionado
    estudianteController.findById(id, (err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra el estudiante, devuelve un error 404
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        // Si se encuentra el estudiante, lo devuelve con el código de estado 200
        res.status(200).json(result);
    });
});

// RUTA PUT -> Actualizar los datos de un estudiante existente
estudianteRouter.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id; // Obtiene el ID del estudiante de los parámetros de la URL
    const updatedEstudiante = req.body; // Obtiene los datos actualizados del estudiante del cuerpo de la solicitud

    // Llama al controlador para actualizar los datos del estudiante con el ID proporcionado
    estudianteController.update(id, updatedEstudiante, (err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra el estudiante, devuelve un error 404
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        // Si la actualización es exitosa, devuelve el mensaje de éxito con el código de estado 200
        res.status(200).json({ message: 'Estudiante actualizado exitosamente', data: result });
    });
});

// RUTA DELETE -> Eliminar un estudiante por su ID
estudianteRouter.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id; // Obtiene el ID del estudiante de los parámetros de la URL

    // Llama al controlador para eliminar el estudiante con el ID proporcionado
    estudianteController.deleteById(id, (err: Error, result: any) => {
        if (err) {
            // Si ocurre un error, devuelve un error 500 con el mensaje de error
            return res.status(500).json({ message: err.message });
        }
        if (!result) {
            // Si no se encuentra el estudiante, devuelve un error 404
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        // Si la eliminación es exitosa, devuelve el mensaje de éxito con el código de estado 200
        res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
    });
});

// Exporta el router para que sea utilizado en otras partes de la aplicación
export { estudianteRouter };
