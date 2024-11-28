"use strict";
// Este archivo maneja las operaciones CRUD para la entidad "Imparte" en la base de datos
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImparte = exports.updateGrupoHorario = exports.findProfesoresByAsignatura = exports.findAsignaturasByProfesor = exports.create = void 0;
// Importación de la conexión a la base de datos
const db_1 = require("../../db"); // Importa la conexión a la base de datos desde el archivo db.ts
// Función para crear un nuevo registro en la tabla 'imparte'
const create = (imparte, callback) => {
    // Cadena SQL para insertar un nuevo registro en la tabla 'imparte'
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    // Ejecuta la consulta SQL para insertar los datos de un nuevo registro
    db_1.db.query(queryString, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], // Datos del registro a insertar
    (err) => {
        if (err) {
            callback(err);
        } // Si ocurre un error, lo pasa al callback
        // Si la inserción fue exitosa, llama al callback con un mensaje de éxito
        callback(null, {
            statusCode: 201, // Código de estado 201: Creación exitosa
            message: 'Registro de Imparte creado exitosamente', // Mensaje de éxito
            data: { id_p: imparte.id_p, cod_a: imparte.cod_a } // Datos del registro creado
        });
    });
};
exports.create = create;
// Función para obtener las asignaturas impartidas por un profesor
const findAsignaturasByProfesor = (idProfesor, callback) => {
    // Cadena SQL para obtener las asignaturas impartidas por un profesor
    const queryString = `
        SELECT imparte.grupo, imparte.horario, asignaturas.nombre AS asignatura
        FROM imparte
        JOIN asignaturas ON imparte.cod_a = asignaturas.cod_a
        WHERE imparte.id_p = ?;
    `;
    // Ejecuta la consulta SQL para obtener las asignaturas
    db_1.db.query(queryString, [idProfesor], (err, results) => {
        if (err)
            return callback(err); // Si hay un error, lo pasa al callback
        callback(null, results); // Si la consulta es exitosa, pasa los resultados al callback
    });
};
exports.findAsignaturasByProfesor = findAsignaturasByProfesor;
// Función para obtener los profesores que imparten una asignatura
const findProfesoresByAsignatura = (codAsignatura, callback) => {
    // Cadena SQL para obtener los profesores que imparten una asignatura
    const queryString = `
        SELECT profesores.nombre AS profesor, imparte.grupo, imparte.horario
        FROM imparte
        JOIN profesores ON imparte.id_p = profesores.id_p
        WHERE imparte.cod_a = ?;
    `;
    // Ejecuta la consulta SQL para obtener los profesores
    db_1.db.query(queryString, [codAsignatura], (err, results) => {
        if (err)
            return callback(err); // Si hay un error, lo pasa al callback
        callback(null, results); // Si la consulta es exitosa, pasa los resultados al callback
    });
};
exports.findProfesoresByAsignatura = findProfesoresByAsignatura;
// Función para actualizar el grupo y horario de un registro
const updateGrupoHorario = (id, grupo, horario, callback) => {
    // Cadena SQL para actualizar el grupo y horario de un registro
    const queryString = "UPDATE imparte SET grupo = ?, horario = ? WHERE id = ?";
    // Ejecuta la consulta SQL para actualizar los datos
    db_1.db.query(queryString, [grupo, horario, id], // Parámetros a actualizar
    (err, results) => {
        if (err)
            return callback(err); // Si hay un error, lo pasa al callback
        // Verifica si alguna fila fue afectada
        if (results.affectedRows === 0) {
            callback(null, {
                statusCode: 404, // Código de estado 404: No encontrado
                message: "Registro no encontrado", // Mensaje si no se encuentra el registro
            });
        }
        else {
            callback(null, {
                statusCode: 200, // Código de estado 200: Actualización exitosa
                message: "Grupo y horario actualizados exitosamente", // Mensaje de éxito
            });
        }
    });
};
exports.updateGrupoHorario = updateGrupoHorario;
// Función para eliminar un registro de la tabla 'imparte'
const deleteImparte = (id, callback) => {
    // Cadena SQL para eliminar un registro de la tabla 'imparte'
    const queryString = "DELETE FROM imparte WHERE id = ?";
    // Ejecuta la consulta SQL para eliminar el registro
    db_1.db.query(queryString, [id], (err, results) => {
        if (err)
            return callback(err); // Si hay un error, lo pasa al callback
        // Verifica si alguna fila fue afectada
        if (results.affectedRows === 0) {
            callback(null, {
                statusCode: 404, // Código de estado 404: No encontrado
                message: "Registro no encontrado", // Mensaje si no se encuentra el registro
            });
        }
        else {
            callback(null, {
                statusCode: 200, // Código de estado 200: Eliminación exitosa
                message: "Registro eliminado exitosamente", // Mensaje de éxito
            });
        }
    });
};
exports.deleteImparte = deleteImparte;
