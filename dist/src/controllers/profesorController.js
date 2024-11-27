"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.findById = exports.findAll = exports.create = void 0;
const db_1 = require("../../db"); // Importa la conexión a la base de datos
const create = (profesor, callback) => {
    const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion], (err) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, {
                statusCode: 201,
                message: 'Profesor creado exitosamente',
                data: { id_p: profesor.id_p }
            });
        }
    });
};
exports.create = create;
const findAll = (callback) => {
    const queryString = 'SELECT * FROM profesores';
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
    const queryString = 'SELECT * FROM profesores WHERE id_p = ?';
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        // Ahora puedes usar `results.length`
        if (results.length === 0) {
            callback(new Error('Profesores no encontrado'));
            return;
        }
        callback(null, results[0]);
    });
};
exports.findById = findById;
const update = (id, profesor, callback) => {
    const queryString = 'UPDATE profesores SET nom_p = ?, dir_p = ?, tel_p = ?, profesion = ? WHERE id_p = ?';
    db_1.db.query(queryString, [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion], (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        // Ahora puedes usar `results.affectedRows`
        if (results.affectedRows === 0) {
            callback(new Error('Profesor no encontrado'));
            return;
        }
        callback(null, {
            statusCode: 200,
            message: 'Profesor actualizado exitosamente',
        });
    });
};
exports.update = update;
const deleteById = (id, callback) => {
    const queryString = 'DELETE FROM profesores WHERE id_p = ?';
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        // Ahora puedes usar `results.affectedRows`
        if (results.affectedRows === 0) {
            callback(new Error('Profesor no encontrado'));
            return;
        }
        callback(null, {
            statusCode: 200,
            message: 'Profesor eliminado exitosamente',
        });
    });
};
exports.deleteById = deleteById;
