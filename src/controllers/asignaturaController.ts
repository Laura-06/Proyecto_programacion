import { Asignatura } from "../models/asignaturaModel";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";

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

export const findAll = (callback: Function) => {
    const queryString = 'SELECT * FROM asignaturas';
  
    db.query(queryString, (err, results) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
};

    export const findById = (id: string, callback: Function) => {
        const queryString = 'SELECT * FROM asignaturas WHERE cod_a = ?';
      
        db.query<RowDataPacket[]>(queryString, [id], (err, results) => {
          if (err) {
            callback(err);
            return;
          }
      
          // Ahora puedes usar `results.length`
          if (results.length === 0) {
            callback(new Error('Asignatura no encontrada'));
            return;
          }
      
          callback(null, results[0]);
        });
      };
    
      export const update = (id: string, asignatura: Asignatura, callback: Function) => {
        const queryString =
          'UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE cod_a = ?';
      
        db.query<OkPacket>(
          queryString,
          [asignatura.nom_a, asignatura.int_h, asignatura.creditos, id],
          (err, results) => {
            if (err) {
              callback(err);
              return;
            }
      
            // Ahora puedes usar `results.affectedRows`
            if (results.affectedRows === 0) {
              callback(new Error('Asignatura no encontrada'));
              return;
            }
      
            callback(null, {
              statusCode: 200,
              message: 'Asignatura actualizada exitosamente',
            });
          }
        );
      };
      
      export const deleteById = (id: string, callback: Function) => {
        const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';
      
        db.query<OkPacket>(queryString, [id], (err, results) => {
          if (err) {
            callback(err);
            return;
          }
      
          // Ahora puedes usar `results.affectedRows`
          if (results.affectedRows === 0) {
            callback(new Error('Asignatura no encontrada'));
            return;
          }
      
          callback(null, {
            statusCode: 200,
            message: 'Asignatura eliminada exitosamente',
          });
        });
      };
