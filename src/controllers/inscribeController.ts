// Este archivo maneja las operaciones CRUD para la entidad "Inscribe" en la base de datos

// Importación del modelo de Inscribe
import { Inscribe } from "../models/inscribeModel"; // Importa el tipo Inscribe desde el modelo
// Importación de la conexión a la base de datos
import { db } from "../../db"; // Importa la conexión a la base de datos desde el archivo db.ts
// Importación del tipo ResultSetHeader para manejar los resultados de la consulta
import { ResultSetHeader } from 'mysql2'; // Importa ResultSetHeader de mysql2 para manejar la respuesta de la consulta

// FUNCIONALIDAD 1: Crear un nuevo registro en la tabla 'inscribe'

// Función para crear un nuevo registro en la tabla 'inscribe'
export const create = (inscribe: Inscribe, callback: Function) => {
    // Cadena SQL para insertar un nuevo registro en la tabla 'inscribe'
    const queryString = 'INSERT INTO inscribe (cod_e, cod_a, id_p, grupo, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?)';

    // Ejecuta la consulta SQL para insertar los datos de un nuevo registro
    db.query(
        queryString,
        [inscribe.cod_e, inscribe.cod_a, inscribe.id_p, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3], // Datos del registro a insertar
        (err) => { // Maneja el error o el éxito de la consulta
            if (err) { callback(err); } // Si ocurre un error, lo pasa al callback

            // Si la inserción fue exitosa, llama al callback con un mensaje de éxito
            callback(null, {
                statusCode: 201, // Código de estado 201: Creación exitosa
                message: 'Registro de Inscribe creado exitosamente', // Mensaje de éxito
                data: { cod_e: inscribe.cod_e, cod_a: inscribe.cod_a } // Datos del registro creado
            });
        }
    );
};

// FUNCIONALIDAD 2: Consultar estudiantes y sus notas por asignatura y grupo

// Función para obtener estudiantes y sus notas por asignatura y grupo
export const findEstudiantesByAsignaturaGrupo = (codAsignatura: number, grupo: string, callback: Function) => {
    // Cadena SQL para obtener los estudiantes y sus notas por asignatura y grupo
    const queryString = `
        SELECT estudiantes.nombre AS estudiante, inscribe.n1, inscribe.n2, inscribe.n3
        FROM inscribe
        JOIN estudiantes ON inscribe.cod_e = estudiantes.cod_e
        WHERE inscribe.cod_a = ? AND inscribe.grupo = ?;
    `;

    // Ejecuta la consulta SQL para obtener los resultados
    db.query(queryString, [codAsignatura, grupo], (err, results) => { // Maneja el error y los resultados
        if (err) return callback(err); // Si hay un error, lo pasa al callback
        callback(null, results); // Si la consulta es exitosa, pasa los resultados al callback
    });
};

// FUNCIONALIDAD 3: Consultar asignaturas de un estudiante

// Función para obtener las asignaturas de un estudiante
export const findAsignaturasByEstudiante = (codEstudiante: number, callback: Function) => {
    // Cadena SQL para obtener las asignaturas de un estudiante
    const queryString = `
        SELECT asignaturas.nombre AS asignatura, profesores.nombre AS profesor, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3
        FROM inscribe
        JOIN asignaturas ON inscribe.cod_a = asignaturas.cod_a
        JOIN profesores ON inscribe.id_p = profesores.id_p
        WHERE inscribe.cod_e = ?;
    `;

    // Ejecuta la consulta SQL para obtener los resultados
    db.query(queryString, [codEstudiante], (err, results) => { // Maneja el error y los resultados
        if (err) return callback(err); // Si hay un error, lo pasa al callback
        callback(null, results); // Si la consulta es exitosa, pasa los resultados al callback
    });
};

// FUNCIONALIDAD 4: Editar las notas de un estudiante en una asignatura

// Función para actualizar las notas de un estudiante en una asignatura específica
export const updateNotas = (
    codEstudiante: number,
    codAsignatura: number,
    notas: { n1: number; n2: number; n3: number },
    callback: Function
) => {
    // Cadena SQL para actualizar las notas de un estudiante en una asignatura
    const queryString = `
        UPDATE inscribe 
        SET n1 = ?, n2 = ?, n3 = ?
        WHERE cod_e = ? AND cod_a = ?
    `;

    // Ejecuta la consulta SQL para actualizar las notas
    db.query<ResultSetHeader>(
        queryString,
        [notas.n1, notas.n2, notas.n3, codEstudiante, codAsignatura], // Parámetros a actualizar
        (err, result) => { // Maneja el error y los resultados de la consulta
            if (err) {
                return callback(err); // Si hay un error, lo pasa al callback
            }

            // Verifica si alguna fila fue afectada
            if (result.affectedRows === 0) {
                return callback(null, {
                    statusCode: 404, // Código de estado 404: No encontrado
                    message: "No se encontró la inscripción para actualizar", // Mensaje si no se encuentra la inscripción
                });
            }

            callback(null, {
                statusCode: 200, // Código de estado 200: Actualización exitosa
                message: "Notas actualizadas exitosamente", // Mensaje de éxito
                data: { cod_e: codEstudiante, cod_a: codAsignatura }, // Datos actualizados
            });
        }
    );
};
