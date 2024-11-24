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