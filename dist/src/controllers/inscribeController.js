"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotas = exports.findAsignaturasByEstudiante = exports.findEstudiantesByAsignaturaGrupo = exports.create = void 0;
const db_1 = require("../../db");
const create = (inscribe, callback) => {
    const queryString = 'INSERT INTO inscribe (cod_e, cod_a, id_p, grupo, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [inscribe.cod_e, inscribe.cod_a, inscribe.id_p, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Registro de Inscribe creado exitosamente',
            data: { cod_e: inscribe.cod_e, cod_a: inscribe.cod_a }
        });
    });
};
exports.create = create;
// GET -> Consultar estudiantes y sus notas por asignatura y grupo 
const findEstudiantesByAsignaturaGrupo = (codAsignatura, grupo, callback) => {
    const queryString = `
        SELECT estudiantes.nombre AS estudiante, inscribe.n1, inscribe.n2, inscribe.n3
        FROM inscribe
        JOIN estudiantes ON inscribe.cod_e = estudiantes.cod_e
        WHERE inscribe.cod_a = ? AND inscribe.grupo = ?;
    `;
    db_1.db.query(queryString, [codAsignatura, grupo], (err, results) => {
        if (err)
            return callback(err);
        callback(null, results);
    });
};
exports.findEstudiantesByAsignaturaGrupo = findEstudiantesByAsignaturaGrupo;
//GET Consultar asignaturas de un estudiante
const findAsignaturasByEstudiante = (codEstudiante, callback) => {
    const queryString = `
        SELECT asignaturas.nombre AS asignatura, profesores.nombre AS profesor, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3
        FROM inscribe
        JOIN asignaturas ON inscribe.cod_a = asignaturas.cod_a
        JOIN profesores ON inscribe.id_p = profesores.id_p
        WHERE inscribe.cod_e = ?;
    `;
    db_1.db.query(queryString, [codEstudiante], (err, results) => {
        if (err)
            return callback(err);
        callback(null, results);
    });
};
exports.findAsignaturasByEstudiante = findAsignaturasByEstudiante;
// PUT -> Editar notas de un estudiante
const updateNotas = (codEstudiante, codAsignatura, notas, callback) => {
    const queryString = `
        UPDATE inscribe 
        SET n1 = ?, n2 = ?, n3 = ?
        WHERE cod_e = ? AND cod_a = ?
    `;
    db_1.db.query(queryString, [notas.n1, notas.n2, notas.n3, codEstudiante, codAsignatura], (err, result) => {
        if (err) {
            return callback(err);
        }
        // Valida si alguna fila fue afectada
        if (result.affectedRows === 0) {
            return callback(null, {
                statusCode: 404,
                message: "No se encontró la inscripción para actualizar",
            });
        }
        callback(null, {
            statusCode: 200,
            message: "Notas actualizadas exitosamente",
            data: { cod_e: codEstudiante, cod_a: codAsignatura },
        });
    });
};
exports.updateNotas = updateNotas;
