"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImparte = exports.updateGrupoHorario = exports.findProfesoresByAsignatura = exports.findAsignaturasByProfesor = exports.create = void 0;
const db_1 = require("../../db");
const create = (imparte, callback) => {
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Registro de Imparte creado exitosamente',
            data: { id_p: imparte.id_p, cod_a: imparte.cod_a }
        });
    });
};
exports.create = create;
// GET -> Consultar asignaturas impartidas por un profesor 
const findAsignaturasByProfesor = (idProfesor, callback) => {
    const queryString = `
        SELECT imparte.grupo, imparte.horario, asignaturas.nombre AS asignatura
        FROM imparte
        JOIN asignaturas ON imparte.cod_a = asignaturas.cod_a
        WHERE imparte.id_p = ?;
    `;
    db_1.db.query(queryString, [idProfesor], (err, results) => {
        if (err)
            return callback(err);
        callback(null, results);
    });
};
exports.findAsignaturasByProfesor = findAsignaturasByProfesor;
// GET -> Consultar profesores que imparten una asignatura (GET)
const findProfesoresByAsignatura = (codAsignatura, callback) => {
    const queryString = `
        SELECT profesores.nombre AS profesor, imparte.grupo, imparte.horario
        FROM imparte
        JOIN profesores ON imparte.id_p = profesores.id_p
        WHERE imparte.cod_a = ?;
    `;
    db_1.db.query(queryString, [codAsignatura], (err, results) => {
        if (err)
            return callback(err);
        callback(null, results);
    });
};
exports.findProfesoresByAsignatura = findProfesoresByAsignatura;
// PUT -> Actualizar grupo y horario
const updateGrupoHorario = (id, grupo, horario, callback) => {
    const queryString = "UPDATE imparte SET grupo = ?, horario = ? WHERE id = ?";
    db_1.db.query(queryString, [grupo, horario, id], (err, results) => {
        if (err)
            return callback(err);
        // Validar si alguna fila fue afectada
        if (results.affectedRows === 0) {
            callback(null, {
                statusCode: 404,
                message: "Registro no encontrado",
            });
        }
        else {
            callback(null, {
                statusCode: 200,
                message: "Grupo y horario actualizados exitosamente",
            });
        }
    });
};
exports.updateGrupoHorario = updateGrupoHorario;
// DELETE -> Eliminar relación
const deleteImparte = (id, callback) => {
    const queryString = "DELETE FROM imparte WHERE id = ?";
    db_1.db.query(queryString, [id], (err, results) => {
        if (err)
            return callback(err);
        // Validar si alguna fila fue afectada
        if (results.affectedRows === 0) {
            callback(null, {
                statusCode: 404,
                message: "Registro no encontrado",
            });
        }
        else {
            callback(null, {
                statusCode: 200,
                message: "Registro eliminado exitosamente",
            });
        }
    });
};
exports.deleteImparte = deleteImparte;
