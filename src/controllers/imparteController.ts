import { Imparte } from "../models/imparteModel";
import { db } from "../../db";

export const create = (imparte: Imparte, callback: Function) => {
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';

    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario],
        (err) => {
            if (err) { callback(err); }

            callback(null, {
                statusCode: 201,
                message: 'Registro de Imparte creado exitosamente',
                data: { id_p: imparte.id_p, cod_a: imparte.cod_a }
            });
        }
    );
};
