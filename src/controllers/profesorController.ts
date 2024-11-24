import { Profesor } from "../models/profesorModel"; // Importa el modelo de profesor
import { db } from "../../db"; // Importa la conexión a la base de datos

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

