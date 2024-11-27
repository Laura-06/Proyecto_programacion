import { Imparte } from "../models/imparteModel";
import { db } from "../../db";
import { ResultSetHeader } from 'mysql2';


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

// GET -> Consultar asignaturas impartidas por un profesor 
export const findAsignaturasByProfesor = (idProfesor: number, callback: Function) => {
    const queryString = `
        SELECT imparte.grupo, imparte.horario, asignaturas.nombre AS asignatura
        FROM imparte
        JOIN asignaturas ON imparte.cod_a = asignaturas.cod_a
        WHERE imparte.id_p = ?;
    `;

    db.query(queryString, [idProfesor], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// GET -> Consultar profesores que imparten una asignatura (GET)
export const findProfesoresByAsignatura = (codAsignatura: number, callback: Function) => {
    const queryString = `
        SELECT profesores.nombre AS profesor, imparte.grupo, imparte.horario
        FROM imparte
        JOIN profesores ON imparte.id_p = profesores.id_p
        WHERE imparte.cod_a = ?;
    `;

    db.query(queryString, [codAsignatura], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// PUT -> Actualizar grupo y horario
export const updateGrupoHorario = (
    id: number,
    grupo: string,
    horario: string,
    callback: Function
) => {
    const queryString = "UPDATE imparte SET grupo = ?, horario = ? WHERE id = ?";

    db.query<ResultSetHeader>(
        queryString,
        [grupo, horario, id],
        (err, results) => {
            if (err) return callback(err);

            // Validar si alguna fila fue afectada
            if (results.affectedRows === 0) {
                callback(null, {
                    statusCode: 404,
                    message: "Registro no encontrado",
                });
            } else {
                callback(null, {
                    statusCode: 200,
                    message: "Grupo y horario actualizados exitosamente",
                });
            }
        }
    );
};

// DELETE -> Eliminar relación
export const deleteImparte = (id: number, callback: Function) => {
    const queryString = "DELETE FROM imparte WHERE id = ?";

    db.query<ResultSetHeader>(queryString, [id], (err, results) => {
        if (err) return callback(err);

        // Validar si alguna fila fue afectada
        if (results.affectedRows === 0) {
            callback(null, {
                statusCode: 404,
                message: "Registro no encontrado",
            });
        } else {
            callback(null, {
                statusCode: 200,
                message: "Registro eliminado exitosamente",
            });
        }
    });
};
