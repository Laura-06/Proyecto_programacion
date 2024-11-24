"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
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
