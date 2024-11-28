// Este archivo maneja las operaciones CRUD para la entidad "Asignatura" en la base de datos

// Importación del modelo de Asignatura
import { Asignatura } from "../models/asignaturaModel"; // Importa el tipo Asignatura definido en el modelo
// Importación de la conexión a la base de datos
import { db } from "../../db"; // Importa la conexión a la base de datos desde el archivo db.ts
// Importación de tipos para manejar los resultados de la base de datos
import { OkPacket, RowDataPacket } from "mysql2"; // Importa los tipos OkPacket y RowDataPacket de mysql2

// Función para crear una nueva asignatura en la base de datos
export const create = (asignatura: Asignatura, callback: Function) => {
    // Cadena SQL para insertar una nueva asignatura
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos) VALUES (?, ?, ?, ?)';

    // Ejecuta la consulta SQL para insertar la asignatura
    db.query(
        queryString,
        [asignatura.cod_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos],
        (err) => { // Maneja el error o éxito de la consulta
            if (err) { callback(err); } // Si hay un error, llama al callback con el error

            // Si la inserción fue exitosa, llama al callback con un mensaje de éxito
            callback(null, {
                statusCode: 201, // Código de estado 201: Creación exitosa
                message: 'Asignatura creada exitosamente', // Mensaje de éxito
                data: { cod_a: asignatura.cod_a } // Devuelve el código de la asignatura creada
            });
        }
    );
};

// Función para obtener todas las asignaturas de la base de datos
export const findAll = (callback: Function) => {
    // Cadena SQL para seleccionar todas las asignaturas
    const queryString = 'SELECT * FROM asignaturas';
  
    // Ejecuta la consulta SQL para obtener todas las asignaturas
    db.query(queryString, (err, results) => { // Maneja el error o los resultados de la consulta
      if (err) {
        callback(err); // Si hay un error, llama al callback con el error
        return;
      }
      callback(null, results); // Si no hay error, llama al callback con los resultados
    });
};

// Función para encontrar una asignatura por su código
export const findById = (id: string, callback: Function) => {
    // Cadena SQL para seleccionar una asignatura por su código
    const queryString = 'SELECT * FROM asignaturas WHERE cod_a = ?';
  
    // Ejecuta la consulta SQL para encontrar la asignatura por su código
    db.query<RowDataPacket[]>(queryString, [id], (err, results) => { // Maneja el error y los resultados de la consulta
      if (err) {
        callback(err); // Si hay un error, llama al callback con el error
        return;
      }
  
      // Verifica si la asignatura fue encontrada
      if (results.length === 0) {
        callback(new Error('Asignatura no encontrada')); // Si no se encuentra la asignatura, llama al callback con un error
        return;
      }
  
      // Si la asignatura es encontrada, llama al callback con los detalles de la asignatura
      callback(null, results[0]);
    });
};

// Función para actualizar una asignatura en la base de datos
export const update = (id: string, asignatura: Asignatura, callback: Function) => {
    // Cadena SQL para actualizar una asignatura
    const queryString =
      'UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE cod_a = ?';
  
    // Ejecuta la consulta SQL para actualizar la asignatura
    db.query<OkPacket>(
      queryString,
      [asignatura.nom_a, asignatura.int_h, asignatura.creditos, id],
      (err, results) => { // Maneja el error y los resultados de la consulta
        if (err) {
          callback(err); // Si hay un error, llama al callback con el error
          return;
        }
  
        // Verifica si la asignatura fue actualizada
        if (results.affectedRows === 0) {
          callback(new Error('Asignatura no encontrada')); // Si no se actualiza ninguna asignatura, llama al callback con un error
          return;
        }
  
        // Si la asignatura fue actualizada, llama al callback con un mensaje de éxito
        callback(null, {
          statusCode: 200, // Código de estado 200: Actualización exitosa
          message: 'Asignatura actualizada exitosamente', // Mensaje de éxito
        });
      }
    );
};

// Función para eliminar una asignatura por su código
export const deleteById = (id: string, callback: Function) => {
    // Cadena SQL para eliminar una asignatura por su código
    const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';
  
    // Ejecuta la consulta SQL para eliminar la asignatura
    db.query<OkPacket>(queryString, [id], (err, results) => { // Maneja el error y los resultados de la consulta
      if (err) {
        callback(err); // Si hay un error, llama al callback con el error
        return;
      }
  
      // Verifica si la asignatura fue eliminada
      if (results.affectedRows === 0) {
        callback(new Error('Asignatura no encontrada')); // Si no se elimina ninguna asignatura, llama al callback con un error
        return;
      }
  
      // Si la asignatura fue eliminada, llama al callback con un mensaje de éxito
      callback(null, {
        statusCode: 200, // Código de estado 200: Eliminación exitosa
        message: 'Asignatura eliminada exitosamente', // Mensaje de éxito
      });
    });
};

