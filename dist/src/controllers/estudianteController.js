"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
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
