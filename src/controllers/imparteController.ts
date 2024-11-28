// Este archivo maneja las operaciones CRUD para la entidad "Imparte" en la base de datos

// Importación del modelo de Imparte
import { Imparte } from "../models/imparteModel"; // Importa el tipo Imparte desde el modelo
// Importación de la conexión a la base de datos
import { db } from "../../db"; // Importa la conexión a la base de datos desde el archivo db.ts
// Importación del tipo ResultSetHeader para manejar los resultados de la consulta
import { ResultSetHeader } from 'mysql2'; // Importa ResultSetHeader de mysql2 para manejar la respuesta de la consulta

// Función para crear un nuevo registro en la tabla 'imparte'
export const create = (imparte: Imparte, callback: Function) => {
    // Cadena SQL para insertar un nuevo registro en la tabla 'imparte'
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';

    // Ejecuta la consulta SQL para insertar los datos de un nuevo registro
    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], // Datos del registro a insertar
        (err) => { // Maneja el error o el éxito de la consulta
            if (err) { callback(err); } // Si ocurre un error, lo pasa al callback

            // Si la inserción fue exitosa, llama al callback con un mensaje de éxito
            callback(null, {
                statusCode: 201, // Código de estado 201: Creación exitosa
                message: 'Registro de Imparte creado exitosamente', // Mensaje de éxito
                data: { id_p: imparte.id_p, cod_a: imparte.cod_a } // Datos del registro creado
            });
        }
    );
};

// Función para obtener las asignaturas impartidas por un profesor
export const findAsignaturasByProfesor = (idProfesor: number, callback: Function) => {
    // Cadena SQL para obtener las asignaturas impartidas por un profesor
    const queryString = `
        SELECT imparte.grupo, imparte.horario, asignaturas.nombre AS asignatura
        FROM imparte
        JOIN asignaturas ON imparte.cod_a = asignaturas.cod_a
        WHERE imparte.id_p = ?;
    `;

    // Ejecuta la consulta SQL para obtener las asignaturas
    db.query(queryString, [idProfesor], (err, results) => { // Maneja el error y los resultados
        if (err) return callback(err); // Si hay un error, lo pasa al callback
        callback(null, results); // Si la consulta es exitosa, pasa los resultados al callback
    });
};

// Función para obtener los profesores que imparten una asignatura
export const findProfesoresByAsignatura = (codAsignatura: number, callback: Function) => {
    // Cadena SQL para obtener los profesores que imparten una asignatura
    const queryString = `
        SELECT profesores.nombre AS profesor, imparte.grupo, imparte.horario
        FROM imparte
        JOIN profesores ON imparte.id_p = profesores.id_p
        WHERE imparte.cod_a = ?;
    `;

    // Ejecuta la consulta SQL para obtener los profesores
    db.query(queryString, [codAsignatura], (err, results) => { // Maneja el error y los resultados
        if (err) return callback(err); // Si hay un error, lo pasa al callback
        callback(null, results); // Si la consulta es exitosa, pasa los resultados al callback
    });
};

// Función para actualizar el grupo y horario de un registro
export const updateGrupoHorario = (
    id: number,
    grupo: string,
    horario: string,
    callback: Function
) => {
    // Cadena SQL para actualizar el grupo y horario de un registro
    const queryString = "UPDATE imparte SET grupo = ?, horario = ? WHERE id = ?";

    // Ejecuta la consulta SQL para actualizar los datos
    db.query<ResultSetHeader>(
        queryString,
        [grupo, horario, id], // Parámetros a actualizar
        (err, results) => { // Maneja el error y los resultados de la consulta
            if (err) return callback(err); // Si hay un error, lo pasa al callback

            // Verifica si alguna fila fue afectada
            if (results.affectedRows === 0) {
                callback(null, {
                    statusCode: 404, // Código de estado 404: No encontrado
                    message: "Registro no encontrado", // Mensaje si no se encuentra el registro
                });
            } else {
                callback(null, {
                    statusCode: 200, // Código de estado 200: Actualización exitosa
                    message: "Grupo y horario actualizados exitosamente", // Mensaje de éxito
                });
            }
        }
    );
};

// Función para eliminar un registro de la tabla 'imparte'
export const deleteImparte = (id: number, callback: Function) => {
    // Cadena SQL para eliminar un registro de la tabla 'imparte'
    const queryString = "DELETE FROM imparte WHERE id = ?";

    // Ejecuta la consulta SQL para eliminar el registro
    db.query<ResultSetHeader>(queryString, [id], (err, results) => { // Maneja el error y los resultados
        if (err) return callback(err); // Si hay un error, lo pasa al callback

        // Verifica si alguna fila fue afectada
        if (results.affectedRows === 0) {
            callback(null, {
                statusCode: 404, // Código de estado 404: No encontrado
                message: "Registro no encontrado", // Mensaje si no se encuentra el registro
            });
        } else {
            callback(null, {
                statusCode: 200, // Código de estado 200: Eliminación exitosa
                message: "Registro eliminado exitosamente", // Mensaje de éxito
            });
        }
    });
};

