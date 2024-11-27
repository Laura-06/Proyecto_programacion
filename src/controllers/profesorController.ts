import { Profesor } from "../models/profesorModel"; // Importa el modelo de profesor
import { db } from "../../db"; // Importa la conexión a la base de datos
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (profesor: Profesor, callback: Function) => {
    const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion],
        (err) => {
            if (err) { 
                callback(err);
            } else {
                callback(null, {
                    statusCode: 201,
                    message: 'Profesor creado exitosamente',
                    data: { id_p: profesor.id_p }
                });
            }
        }
    );
};

export const findAll = (callback: Function) => {
    const queryString = 'SELECT * FROM profesores';
  
    db.query(queryString, (err, results) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
};

export const findById = (id: string, callback: Function) => {
        const queryString = 'SELECT * FROM profesores WHERE id_p = ?';
      
        db.query<RowDataPacket[]>(queryString, [id], (err, results) => {
          if (err) {
            callback(err);
            return;
          }
      
          // Ahora puedes usar `results.length`
          if (results.length === 0) {
            callback(new Error('Profesores no encontrado'));
            return;
          }
      
          callback(null, results[0]);
        });
};
    
export const update = (id: string, profesor: Profesor, callback: Function) => {
        const queryString =
          'UPDATE profesores SET nom_p = ?, dir_p = ?, tel_p = ?, profesion = ? WHERE id_p = ?';
      
        db.query<OkPacket>(
          queryString,
          [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion],
          (err, results) => {
            if (err) {
              callback(err);
              return;
            }
      
            // Ahora puedes usar `results.affectedRows`
            if (results.affectedRows === 0) {
              callback(new Error('Profesor no encontrado'));
              return;
            }
      
            callback(null, {
              statusCode: 200,
              message: 'Profesor actualizado exitosamente',
            });
          }
        );
};
      
export const deleteById = (id: string, callback: Function) => {
        const queryString = 'DELETE FROM profesores WHERE id_p = ?';
      
        db.query<OkPacket>(queryString, [id], (err, results) => {
          if (err) {
            callback(err);
            return;
          }
      
          // Ahora puedes usar `results.affectedRows`
          if (results.affectedRows === 0) {
            callback(new Error('Profesor no encontrado'));
            return;
          }
      
          callback(null, {
            statusCode: 200,
            message: 'Profesor eliminado exitosamente',
          });
        });
};

