import { Estudiante } from "../models/estudianteModel";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2"; 

export const create = (estudiante: Estudiante, callback: Function) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac],

        (err) => {
            if (err) { callback(err);} 
           
            callback( null, {
                statusCode: 201,
                message: 'Estudiante creado exitosamente',
                data: {
                    cod_e: estudiante.cod_e
                }
            });
        }      
    );
};

export const findAll = (callback: Function) => {
    const queryString = 'SELECT * FROM estudiantes';
  
    db.query(queryString, (err, results) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
};

export const findById = (id: string, callback: Function) => {
        const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';
      
        db.query<RowDataPacket[]>(queryString, [id], (err, results) => {
          if (err) {
            callback(err);
            return;
          }
      
          // Ahora puedes usar `results.length`
          if (results.length === 0) {
            callback(new Error('Estudiante no encontrado'));
            return;
          }
      
          callback(null, results[0]);
        });
};
    
export const update = (id: string, estudiante: Estudiante, callback: Function) => {
        const queryString =
          'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';
      
        db.query<OkPacket>(
          queryString,
          [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac],
          (err, results) => {
            if (err) {
              callback(err);
              return;
            }
      
            // Ahora puedes usar `results.affectedRows`
            if (results.affectedRows === 0) {
              callback(new Error('Estudiante no encontrado'));
              return;
            }
      
            callback(null, {
              statusCode: 200,
              message: 'Estudiante actualizado exitosamente',
            });
          }
        );
};
      
export const deleteById = (id: string, callback: Function) => {
        const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';
      
        db.query<OkPacket>(queryString, [id], (err, results) => {
          if (err) {
            callback(err);
            return;
          }
      
          // Ahora puedes usar `results.affectedRows`
          if (results.affectedRows === 0) {
            callback(new Error('Estudiante no encontrado'));
            return;
          }
      
          callback(null, {
            statusCode: 200,
            message: 'Estudiante eliminado exitosamente',
          });
        });
};