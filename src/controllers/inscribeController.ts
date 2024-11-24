import { Inscribe } from "../models/inscribeModel";
import { db } from "../../db";

export const create = (inscribe: Inscribe, callback: Function) => {
    const queryString = 'INSERT INTO inscribe (cod_e, cod_a, id_p, grupo, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [inscribe.cod_e, inscribe.cod_a, inscribe.id_p, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3],
        (err) => {
            if (err) { callback(err); }

            callback(null, {
                statusCode: 201,
                message: 'Registro de Inscribe creado exitosamente',
                data: { cod_e: inscribe.cod_e, cod_a: inscribe.cod_a }
            });
        }
    );
};
