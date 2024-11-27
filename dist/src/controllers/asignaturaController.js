"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.findById = exports.findAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (asignatura, callback) => {
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [asignatura.cod_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Asignatura creada exitosamente',
            data: { cod_a: asignatura.cod_a }
        });
    });
};
exports.create = create;
const findAll = (callback) => {
    const queryString = 'SELECT * FROM asignaturas';
    db_1.db.query(queryString, (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, results);
    });
};
exports.findAll = findAll;
const findById = (id, callback) => {
    const queryString = 'SELECT * FROM asignaturas WHERE cod_a = ?';
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        // Ahora puedes usar `results.length`
        if (results.length === 0) {
            callback(new Error('Asignatura no encontrada'));
            return;
        }
        callback(null, results[0]);
    });
};
exports.findById = findById;
const update = (id, asignatura, callback) => {
    const queryString = 'UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE cod_a = ?';
    db_1.db.query(queryString, [asignatura.nom_a, asignatura.int_h, asignatura.creditos, id], (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        // Ahora puedes usar `results.affectedRows`
        if (results.affectedRows === 0) {
            callback(new Error('Asignatura no encontrada'));
            return;
        }
        callback(null, {
            statusCode: 200,
            message: 'Asignatura actualizada exitosamente',
        });
    });
};
exports.update = update;
const deleteById = (id, callback) => {
    const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        // Ahora puedes usar `results.affectedRows`
        if (results.affectedRows === 0) {
            callback(new Error('Asignatura no encontrada'));
            return;
        }
        callback(null, {
            statusCode: 200,
            message: 'Asignatura eliminada exitosamente',
        });
    });
};
exports.deleteById = deleteById;
