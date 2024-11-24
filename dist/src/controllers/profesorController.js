"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const db_1 = require("../../db");
const create = (profesor, callback) => {
    const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Profesor creado exitosamente',
            data: { id_p: profesor.id_p }
        });
    });
};
exports.create = create;
