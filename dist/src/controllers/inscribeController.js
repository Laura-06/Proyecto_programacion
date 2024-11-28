"use strict";
// Este archivo maneja las operaciones CRUD para la entidad "Inscribe" en la base de datos
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotas = exports.findAsignaturasByEstudiante = exports.findEstudiantesByAsignaturaGrupo = exports.create = void 0;
// Importación de la conexión a la base de datos
const db_1 = require("../../db"); // Importa la conexión a la base de datos desde el archivo db.ts
// FUNCIONALIDAD 1: Crear un nuevo registro en la tabla 'inscribe'
// Función para crear un nuevo registro en la tabla 'inscribe'
const create = (inscribe, callback) => {
    // Cadena SQL para insertar un nuevo registro en la tabla 'inscribe'
    const queryString = 'INSERT INTO inscribe (cod_e, cod_a, id_p, grupo, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?)';
    // Ejecuta la consulta SQL para insertar los datos de un nuevo registro
    db_1.db.query(queryString, [inscribe.cod_e, inscribe.cod_a, inscribe.id_p, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3], // Datos del registro a insertar
    (err) => {
        if (err) {
            callback(err);
        } // Si ocurre un error, lo pasa al callback
        // Si la inserción fue exitosa, llama al callback con un mensaje de éxito
        callback(null, {
            statusCode: 201, // Código de estado 201: Creación exitosa
            message: 'Registro de Inscribe creado exitosamente', // Mensaje de éxito
            data: { cod_e: inscribe.cod_e, cod_a: inscribe.cod_a } // Datos del registro creado
        });
    });
};
exports.create = create;
// FUNCIONALIDAD 2: Consultar estudiantes y sus notas por asignatura y grupo
// Función para obtener estudiantes y sus notas por asignatura y grupo
const findEstudiantesByAsignaturaGrupo = (codAsignatura, grupo, callback) => {
    // Cadena SQL para obtener los estudiantes y sus notas por asignatura y grupo
    const queryString = `
        SELECT estudiantes.nombre AS estudiante, inscribe.n1, inscribe.n2, inscribe.n3
        FROM inscribe
        JOIN estudiantes ON inscribe.cod_e = estudiantes.cod_e
        WHERE inscribe.cod_a = ? AND inscribe.grupo = ?;
    `;
    // Ejecuta la consulta SQL para obtener los resultados
    db_1.db.query(queryString, [codAsignatura, grupo], (err, results) => {
        if (err)
            return callback(err); // Si hay un error, lo pasa al callback
        callback(null, results); // Si la consulta es exitosa, pasa los resultados al callback
    });
};
exports.findEstudiantesByAsignaturaGrupo = findEstudiantesByAsignaturaGrupo;
// FUNCIONALIDAD 3: Consultar asignaturas de un estudiante
// Función para obtener las asignaturas de un estudiante
const findAsignaturasByEstudiante = (codEstudiante, callback) => {
    // Cadena SQL para obtener las asignaturas de un estudiante
    const queryString = `
        SELECT asignaturas.nombre AS asignatura, profesores.nombre AS profesor, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3
        FROM inscribe
        JOIN asignaturas ON inscribe.cod_a = asignaturas.cod_a
        JOIN profesores ON inscribe.id_p = profesores.id_p
        WHERE inscribe.cod_e = ?;
    `;
    // Ejecuta la consulta SQL para obtener los resultados
    db_1.db.query(queryString, [codEstudiante], (err, results) => {
        if (err)
            return callback(err); // Si hay un error, lo pasa al callback
        callback(null, results); // Si la consulta es exitosa, pasa los resultados al callback
    });
};
exports.findAsignaturasByEstudiante = findAsignaturasByEstudiante;
// FUNCIONALIDAD 4: Editar las notas de un estudiante en una asignatura
// Función para actualizar las notas de un estudiante en una asignatura específica
const updateNotas = (codEstudiante, codAsignatura, notas, callback) => {
    // Cadena SQL para actualizar las notas de un estudiante en una asignatura
    const queryString = `
        UPDATE inscribe 
        SET n1 = ?, n2 = ?, n3 = ?
        WHERE cod_e = ? AND cod_a = ?
    `;
    // Ejecuta la consulta SQL para actualizar las notas
    db_1.db.query(queryString, [notas.n1, notas.n2, notas.n3, codEstudiante, codAsignatura], // Parámetros a actualizar
    (err, result) => {
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
    });
};
exports.updateNotas = updateNotas;
