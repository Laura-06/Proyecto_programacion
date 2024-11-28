// Este archivo maneja las operaciones CRUD para la entidad "Estudiante" en la base de datos

// Importación del modelo de Estudiante
import { Estudiante } from "../models/estudianteModel"; // Importa el tipo Estudiante definido en el modelo
// Importación de la conexión a la base de datos
import { db } from "../../db"; // Importa la conexión a la base de datos desde el archivo db.ts
// Importación de tipos para manejar los resultados de la base de datos
import { OkPacket, RowDataPacket } from "mysql2"; // Importa los tipos OkPacket y RowDataPacket de mysql2

// Función para crear un nuevo estudiante en la base de datos
export const create = (estudiante: Estudiante, callback: Function) => {
    // Cadena SQL para insertar un nuevo estudiante
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';

    // Ejecuta la consulta SQL para insertar el estudiante
    db.query(
        queryString,
        [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], // Parámetros a insertar
        (err) => { // Maneja el error o éxito de la consulta
            if (err) { callback(err);} // Si hay un error, llama al callback con el error
           
            // Si la inserción fue exitosa, llama al callback con un mensaje de éxito
            callback( null, {
                statusCode: 201, // Código de estado 201: Creación exitosa
                message: 'Estudiante creado exitosamente', // Mensaje de éxito
                data: {
                    cod_e: estudiante.cod_e // Devuelve el código del estudiante creado
                }
            });
        }      
    );
};

// Función para obtener todos los estudiantes de la base de datos
export const findAll = (callback: Function) => {
    // Cadena SQL para seleccionar todos los estudiantes
    const queryString = 'SELECT * FROM estudiantes';
  
    // Ejecuta la consulta SQL para obtener todos los estudiantes
    db.query(queryString, (err, results) => { // Maneja el error o los resultados de la consulta
      if (err) {
        callback(err); // Si hay un error, llama al callback con el error
        return;
      }
      callback(null, results); // Si no hay error, llama al callback con los resultados
    });
};

// Función para encontrar un estudiante por su código
export const findById = (id: string, callback: Function) => {
    // Cadena SQL para seleccionar un estudiante por su código
    const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';
  
    // Ejecuta la consulta SQL para encontrar el estudiante por su código
    db.query<RowDataPacket[]>(queryString, [id], (err, results) => { // Maneja el error y los resultados de la consulta
      if (err) {
        callback(err); // Si hay un error, llama al callback con el error
        return;
      }
  
      // Verifica si el estudiante fue encontrado
      if (results.length === 0) {
        callback(new Error('Estudiante no encontrado')); // Si no se encuentra el estudiante, llama al callback con un error
        return;
      }
  
      // Si el estudiante es encontrado, llama al callback con los detalles del estudiante
      callback(null, results[0]);
    });
};

// Función para actualizar los datos de un estudiante en la base de datos
export const update = (id: string, estudiante: Estudiante, callback: Function) => {
    // Cadena SQL para actualizar un estudiante
    const queryString =
      'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';
  
    // Ejecuta la consulta SQL para actualizar el estudiante
    db.query<OkPacket>(
      queryString,
      [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], // Parámetros a actualizar
      (err, results) => { // Maneja el error y los resultados de la consulta
        if (err) {
          callback(err); // Si hay un error, llama al callback con el error
          return;
        }
  
        // Verifica si el estudiante fue actualizado
        if (results.affectedRows === 0) {
          callback(new Error('Estudiante no encontrado')); // Si no se actualiza ninguna fila, llama al callback con un error
          return;
        }
  
        // Si el estudiante fue actualizado, llama al callback con un mensaje de éxito
        callback(null, {
          statusCode: 200, // Código de estado 200: Actualización exitosa
          message: 'Estudiante actualizado exitosamente', // Mensaje de éxito
        });
      }
    );
};

// Función para eliminar un estudiante por su código
export const deleteById = (id: string, callback: Function) => {
    // Cadena SQL para eliminar un estudiante por su código
    const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';
  
    // Ejecuta la consulta SQL para eliminar el estudiante
    db.query<OkPacket>(queryString, [id], (err, results) => { // Maneja el error y los resultados de la consulta
      if (err) {
        callback(err); // Si hay un error, llama al callback con el error
        return;
      }
  
      // Verifica si el estudiante fue eliminado
      if (results.affectedRows === 0) {
        callback(new Error('Estudiante no encontrado')); // Si no se elimina ninguna fila, llama al callback con un error
        return;
      }
  
      // Si el estudiante fue eliminado, llama al callback con un mensaje de éxito
      callback(null, {
        statusCode: 200, // Código de estado 200: Eliminación exitosa
        message: 'Estudiante eliminado exitosamente', // Mensaje de éxito
      });
    });
};
