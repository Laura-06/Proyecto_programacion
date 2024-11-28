// Este archivo maneja las operaciones CRUD para la entidad "Profesor" en la base de datos

// Importación del modelo de Profesor
import { Profesor } from "../models/profesorModel"; // Importa el modelo de Profesor desde el archivo profesorModel.ts
// Importación de la conexión a la base de datos
import { db } from "../../db"; // Importa la conexión a la base de datos desde el archivo db.ts
// Importación de los tipos OkPacket y RowDataPacket para manejar los resultados de la consulta
import { OkPacket, RowDataPacket } from "mysql2"; // Importa los tipos OkPacket y RowDataPacket de mysql2 para el manejo de la respuesta

// FUNCIONALIDAD 1: Crear un nuevo profesor en la tabla 'profesores'

// Función para crear un nuevo profesor en la base de datos
export const create = (profesor: Profesor, callback: Function) => {
    // Cadena SQL para insertar un nuevo profesor
    const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';

    // Ejecuta la consulta SQL para insertar los datos de un nuevo profesor
    db.query(
        queryString,
        [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion], // Datos del profesor a insertar
        (err) => { // Maneja el error o el éxito de la consulta
            if (err) { // Si ocurre un error, lo pasa al callback
                callback(err);
            } else {
                // Si la inserción fue exitosa, llama al callback con un mensaje de éxito
                callback(null, {
                    statusCode: 201, // Código de estado 201: Creación exitosa
                    message: 'Profesor creado exitosamente', // Mensaje de éxito
                    data: { id_p: profesor.id_p } // Datos del profesor creado
                });
            }
        }
    );
};

// FUNCIONALIDAD 2: Consultar todos los profesores en la base de datos

// Función para obtener todos los profesores
export const findAll = (callback: Function) => {
    // Cadena SQL para obtener todos los profesores
    const queryString = 'SELECT * FROM profesores';
  
    // Ejecuta la consulta SQL para obtener los resultados
    db.query(queryString, (err, results) => { // Maneja el error y los resultados
      if (err) {
        callback(err); // Si hay un error, lo pasa al callback
        return;
      }
      callback(null, results); // Si la consulta es exitosa, pasa los resultados al callback
    });
};

// FUNCIONALIDAD 3: Consultar un profesor por su ID

// Función para obtener un profesor por su ID
export const findById = (id: string, callback: Function) => {
    // Cadena SQL para obtener un profesor específico por su ID
    const queryString = 'SELECT * FROM profesores WHERE id_p = ?';
  
    // Ejecuta la consulta SQL para obtener los resultados
    db.query<RowDataPacket[]>(queryString, [id], (err, results) => { // Maneja el error y los resultados
      if (err) {
        callback(err); // Si hay un error, lo pasa al callback
        return;
      }
  
      // Verifica si se encontraron resultados
      if (results.length === 0) { // Si no se encuentra el profesor, pasa el error
        callback(new Error('Profesor no encontrado'));
        return;
      }
  
      callback(null, results[0]); // Si se encuentra el profesor, pasa los resultados al callback
    });
};

// FUNCIONALIDAD 4: Actualizar los datos de un profesor

// Función para actualizar los datos de un profesor por su ID
export const update = (id: string, profesor: Profesor, callback: Function) => {
    // Cadena SQL para actualizar los datos de un profesor
    const queryString =
      'UPDATE profesores SET nom_p = ?, dir_p = ?, tel_p = ?, profesion = ? WHERE id_p = ?';
  
    // Ejecuta la consulta SQL para actualizar los datos del profesor
    db.query<OkPacket>(
      queryString,
      [profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion, id], // Datos del profesor a actualizar
      (err, results) => { // Maneja el error y los resultados de la consulta
        if (err) {
          callback(err); // Si ocurre un error, lo pasa al callback
          return;
        }
  
        // Verifica si se afectaron filas
        if (results.affectedRows === 0) { // Si no se afectaron filas, significa que el profesor no fue encontrado
          callback(new Error('Profesor no encontrado'));
          return;
        }
  
        // Si la actualización fue exitosa, pasa el mensaje de éxito al callback
        callback(null, {
          statusCode: 200, // Código de estado 200: Actualización exitosa
          message: 'Profesor actualizado exitosamente', // Mensaje de éxito
        });
      }
    );
};

// FUNCIONALIDAD 5: Eliminar un profesor por su ID

// Función para eliminar un profesor por su ID
export const deleteById = (id: string, callback: Function) => {
    // Cadena SQL para eliminar un profesor por su ID
    const queryString = 'DELETE FROM profesores WHERE id_p = ?';
  
    // Ejecuta la consulta SQL para eliminar el profesor
    db.query<OkPacket>(queryString, [id], (err, results) => { // Maneja el error y los resultados
      if (err) {
        callback(err); // Si ocurre un error, lo pasa al callback
        return;
      }
  
      // Verifica si se afectaron filas
      if (results.affectedRows === 0) { // Si no se afectaron filas, significa que el profesor no fue encontrado
        callback(new Error('Profesor no encontrado'));
        return;
      }
  
      // Si la eliminación fue exitosa, pasa el mensaje de éxito al callback
      callback(null, {
        statusCode: 200, // Código de estado 200: Eliminación exitosa
        message: 'Profesor eliminado exitosamente', // Mensaje de éxito
      });
    });
};


