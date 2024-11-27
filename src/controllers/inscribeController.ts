import { Inscribe } from "../models/inscribeModel";
import { db } from "../../db";
import { ResultSetHeader } from 'mysql2';

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

// GET -> Consultar estudiantes y sus notas por asignatura y grupo 
export const findEstudiantesByAsignaturaGrupo = (codAsignatura: number, grupo: string, callback: Function) => {
    const queryString = `
        SELECT estudiantes.nombre AS estudiante, inscribe.n1, inscribe.n2, inscribe.n3
        FROM inscribe
        JOIN estudiantes ON inscribe.cod_e = estudiantes.cod_e
        WHERE inscribe.cod_a = ? AND inscribe.grupo = ?;
    `;

    db.query(queryString, [codAsignatura, grupo], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

//GET Consultar asignaturas de un estudiante
export const findAsignaturasByEstudiante = (codEstudiante: number, callback: Function) => {
    const queryString = `
        SELECT asignaturas.nombre AS asignatura, profesores.nombre AS profesor, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3
        FROM inscribe
        JOIN asignaturas ON inscribe.cod_a = asignaturas.cod_a
        JOIN profesores ON inscribe.id_p = profesores.id_p
        WHERE inscribe.cod_e = ?;
    `;

    db.query(queryString, [codEstudiante], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// PUT -> Editar notas de un estudiante
export const updateNotas = (
    codEstudiante: number,
    codAsignatura: number,
    notas: { n1: number; n2: number; n3: number },
    callback: Function
) => {
    const queryString = `
        UPDATE inscribe 
        SET n1 = ?, n2 = ?, n3 = ?
        WHERE cod_e = ? AND cod_a = ?
    `;

    db.query<ResultSetHeader>(
        queryString,
        [notas.n1, notas.n2, notas.n3, codEstudiante, codAsignatura],
        (err, result) => {
            if (err) {
                return callback(err);
            }

            // Valida si alguna fila fue afectada
            if (result.affectedRows === 0) {
                return callback(null, {
                    statusCode: 404,
                    message: "No se encontró la inscripción para actualizar",
                });
            }

            callback(null, {
                statusCode: 200,
                message: "Notas actualizadas exitosamente",
                data: { cod_e: codEstudiante, cod_a: codAsignatura },
            });
        }
    );
};