"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
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
