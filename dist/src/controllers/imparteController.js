"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
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
