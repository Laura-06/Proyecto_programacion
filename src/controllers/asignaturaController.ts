import { Asignatura } from "../models/asignaturaModel";
import { db } from "../../db";

export const create = (asignatura: Asignatura, callback: Function) => {
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos) VALUES (?, ?, ?, ?)';

    db.query(
        queryString,
        [asignatura.cod_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos],
        (err) => {
            if (err) { callback(err); }

            callback(null, {
                statusCode: 201,
                message: 'Asignatura creada exitosamente',
                data: { cod_a: asignatura.cod_a }
            });
        }
    );
};
