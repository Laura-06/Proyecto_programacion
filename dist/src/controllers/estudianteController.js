"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.findById = exports.findAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (estudiante, callback) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Estudiante creado exitosamente',
            data: {
                cod_e: estudiante.cod_e
            }
        });
    });
};
exports.create = create;
const findAll = (callback) => {
    const queryString = 'SELECT * FROM estudiantes';
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
    const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        // Ahora puedes usar `results.length`
        if (results.length === 0) {
            callback(new Error('Estudiante no encontrado'));
            return;
        }
        callback(null, results[0]);
    });
};
exports.findById = findById;
const update = (id, estudiante, callback) => {
    const queryString = 'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';
    db_1.db.query(queryString, [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        // Ahora puedes usar `results.affectedRows`
        if (results.affectedRows === 0) {
            callback(new Error('Estudiante no encontrado'));
            return;
        }
        callback(null, {
            statusCode: 200,
            message: 'Estudiante actualizado exitosamente',
        });
    });
};
exports.update = update;
const deleteById = (id, callback) => {
    const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        // Ahora puedes usar `results.affectedRows`
        if (results.affectedRows === 0) {
            callback(new Error('Estudiante no encontrado'));
            return;
        }
        callback(null, {
            statusCode: 200,
            message: 'Estudiante eliminado exitosamente',
        });
    });
};
exports.deleteById = deleteById;
